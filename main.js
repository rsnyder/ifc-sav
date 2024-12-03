const classes = new Set('left right center medium small box-shadow'.split(' '))
const components = {
  image: {
    booleans: 'cover nocaption showannos',
    positional: 'src caption'
  }
}
const tagMap = {}
Object.entries(components).forEach(([tag, attrs]) => {
  tagMap[tag] = { 
    booleans : new Set((attrs.booleans || '').split(' ').filter(s => s)),
    positional: (attrs.positional || '').split(' ').filter(s => s)
  }
})

// setup action links to iframes on DOM mutations (e.g., zoomto, flyto, play)
const setupActionLinks = (id) => {
  const actions = new Set('zoomto flyto play'.split(' '))
  document.querySelectorAll('a').forEach(a => {
    let href = a.href || a.getAttribute('data-href')
    let path = href?.split('/').slice(3).filter(p => p !== '#' && p !== '')
    if (actions.has(path[0])) {
      let action = path[0]
      let targetId = path[1]
      let args = path.slice(2)
      if (targetId === id) {
        console.log(`adding action link for ${action} to ${targetId} with args ${args}`)
        if (a.href) {
          a.setAttribute('data-href', href)
          a.removeAttribute('href')
          a.style.cursor = 'pointer'
          a.style.color = 'blue'
          a.addEventListener('click', () => { document.getElementById(targetId).contentWindow.postMessage({ action, args }, '*')})
        }
      }
    }
  })
}

const camelToKebab = (input) => input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
const parseCodeEl = (el) => {
  let tokens = []
  el.textContent.replace(/”/g,'"').replace(/”/g,'"').replace(/’/g,"'").match(/[^\s"]+|"([^"]*)"/gmi)?.filter(t => t).forEach(token => {
    if (tokens.length > 0 && tokens[tokens.length-1].indexOf('=') === tokens[tokens.length-1].length-1) tokens[tokens.length-1] = `${tokens[tokens.length-1]}${token}`
    else tokens.push(token)
  })
  let parsed = {}
  let args = []
  let tokenIdx = 0
  let tagObj
  while (tokenIdx < tokens.length) {
    let token = tokens[tokenIdx].replace(/<em>/g, '_').replace(/<\/em>/g, '_')
    if (token.indexOf('=') > 0 && /^[\w-:]+=/.test(token)) {
      let idx = token.indexOf('=')
      let key = token.slice(0, idx)
      let value = token.slice(idx+1)
      value = value[0] === '"' && value[value.length-1] === '"' ? value.slice(1, -1) : value
      if (key[0] === ':') { // single style
        key = camelToKebab(key.slice(1))
        if (!parsed.style) parsed.style = {}
        parsed.style[key] = value
      } else if (key === 'style') { // multiple styles
        if (!parsed.style) parsed.style = {}
        value.split(';').forEach(style => {
          if (!style) return
          let separatorIdx = style.indexOf(':')
          let k = camelToKebab(style.slice(0,separatorIdx).trim())
          let v = style.slice(separatorIdx+1).trim()
          parsed.style[k] = v
        })
      } else { // kwargs
        if (!parsed.kwargs) parsed.kwargs = {}
        if (parsed.kwargs[key]) parsed.kwargs[key] += ` ${value}`
        else parsed.kwargs[key] = value
      }
    }
    else if (token[0] === '.' || classes.has(token)) {
      let className = token.replace(/^\./,'')
      if (parsed.class) parsed.class += ` ${className}`
      else parsed.class = className
    }
    else if (token[0] === '"') {
      args.push(token.slice(1,-1))
    }
    else if (/#\w+/.test(token)) parsed['id'] = token.slice(1)
    else if (/^Q\d+$/.test(token) && !parsed.tag) { // entity identifier
      if (!parsed.entities) parsed.entities = []
      parsed.entities.push(token)
    }
    else if (tokenIdx === 0 && !parsed.tag && tagMap[token.replace(/^\./,'')]) {
      parsed.tag = token.replace(/^\./,'')
      tagObj = tagMap[parsed.tag]
    }
    else {
      if (tagObj?.booleans.has(token)) {
        if (!parsed.booleans) parsed.booleans = []
        parsed.booleans.push(token)
      } else {
        args.push(token)
        if (tagObj?.positional.length >= tokenIdx) {
          if (!parsed.kwargs) parsed.kwargs = {}
          parsed.kwargs[tagObj.positional[tokenIdx-1]] = token
        }
        else {
          if (!parsed.args) parsed.args = []
          parsed.args.push(token)
        }
      }
    }
    tokenIdx++
  }
  for (let idx = 0; idx < args.length; idx++) {
    if (tagObj?.positional.length > idx) {
      if (!parsed.kwargs) parsed.kwargs = {}
      parsed.kwargs[tagObj.positional[idx]] = args[idx]
    } else {
      if (!parsed.args) parsed.args = []
      parsed.args.push(args[idx])
    }
  }
  return parsed
}

// convert <code> tags to HTML iframe elements
const convertTags = (rootEl) => {
  rootEl.querySelectorAll('p code').forEach(code => {
    console.log(`converting code element to iframe: ${code.textContent}`)
    let tokens = []
    code.textContent.replace(/”/g,'"').replace(/”/g,'"').replace(/’/g,"'").match(/[^\s"]+|"([^"]*)"/gmi)?.filter(t => t).forEach(token => {
      if (tokens.length > 0 && tokens[tokens.length-1].indexOf('=') === tokens[tokens.length-1].length-1) tokens[tokens.length-1] = `${tokens[tokens.length-1]}${token}`
      else tokens.push(token)
    })
    let parsed = parseCodeEl(code)
    if (!parsed.tag) return
    let componentArgs = [...Object.entries(parsed.kwargs || {}).map(([key, value]) => `${key}=${value}`), ...(parsed.booleans || [])].join('&')
    let iframe = document.createElement('iframe')
    if (parsed.id) iframe.id = parsed.id
    if (parsed.class) iframe.className = parsed.class
    iframe.setAttribute('allowfullscreen', '')
    iframe.src = `${parsed.tag}?${componentArgs}`
    code.parentElement.replaceWith(iframe)
  })}

console.log('main.js loaded')

new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    if (mutation.target.tagName === 'BODY' || mutation.target.tagName === 'ARTICLE') {
      convertTags(mutation.target)
    }
    Array.from(mutation.addedNodes).filter(node => node.tagName === 'IFRAME').forEach(iframe => {
      if (iframe.id) setupActionLinks(iframe.id)
    })
  })
}).observe(document.documentElement || document.body, { childList: true, subtree: true, characterData: true })

function isNumeric(arg) { return !isNaN(arg) }

let ids = {}
function makeId(str) {
  let slug = slugify(str)
  ids[slug] = ids[slug] ? ids[slug] + 1 : 1
  return ids[slug] > 1 ? `${slug}-${ids[slug]-1}` : slug
}

function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
           .replace(/\s+/g, '-') // replace spaces with hyphens
           .replace(/-+/g, '-'); // remove consecutive hyphens
  return str
}

const applyStyle = (el, styleObj) => {
  let styles = [
    ...(el.getAttribute('style') || '').split(';').filter(s => s), 
    ...Object.entries(styleObj).map(([k,v]) => {
      if (k == 'background-image') {
        v = `url('${expandShorthandUrl(v)}')`
      }
      return `${k}:${v}`
    })
  ]
  el.setAttribute('style', styles.join(';'))
}

// Restructure the content to have hierarchical sections
function restructure(rootEl) {
  Array.from(rootEl?.querySelectorAll('p, li'))
  .forEach(el => {
    let matches = Array.from(el.innerHTML.matchAll(/==(?<text>[^=}{]+)==/g))
    if (matches.length) {
      let replHtml = []
      matches.forEach((match, idx) => {
        if (idx === 0) replHtml.push(el.innerHTML.slice(0, match.index))
        if (match.groups) {
          let {text} = match.groups
          replHtml.push(`<mark>${text}</mark>`)
          replHtml.push(el.innerHTML.slice(match.index + match[0].length, matches[idx+1]?.index || el.innerHTML.length))
        }
      })
      el.innerHTML = replHtml.join('')
    }
  })

  rootEl.querySelectorAll('code').forEach(codeEl => {
    let parsed = parseCodeEl(codeEl)
    if (parsed.tag || (!parsed.id && !parsed.class && !parsed.style && !parsed.kwargs)) return
    console.log(parsed)
    // console.log(codeEl.parentElement.childNodes)
    codeEl = (codeEl.parentElement.tagName === 'P' && codeEl.parentElement.childNodes.length === 1 && codeEl.parentElement.childNodes[0] === codeEl) ? codeEl.parentElement : codeEl
    let parentEl = codeEl.parentElement
    let priorEl = codeEl.previousElementSibling
    // console.log(codeEl, parentEl, priorEl)
    let target
    if (priorEl?.tagName?.[0] === 'H') target = priorEl
    else if (['STRONG', 'EM', 'MARK'].includes(priorEl?.tagName)) target = priorEl
    else target = parentEl
    console.log(target)

    if (parsed.class) target.className = parsed.class
    if (parsed.id) target.id = parsed.id
    if (parsed.style) applyStyle(target, parsed.style)
    if (parsed.kwargs) for (const [k,v] of Object.entries(parsed.kwargs)) target.setAttribute(k, v === 'true' ? '' : v)
    codeEl.remove()
  })

  let main = document.createElement('main')

  main.className = 'page-content markdown-body'
  main.setAttribute('aria-label', 'Content')
  main.setAttribute('data-theme', 'light')

  let styleSheet = rootEl.querySelector('style')
  if (styleSheet) main.appendChild(styleSheet.cloneNode(true))

  let article = document.createElement('article')
  main.appendChild(article)
  
  let currentSection = article;

  rootEl = rootEl.querySelector('body') || rootEl

  // Converts empty headings (changed to paragraphs by markdown converter) to headings with the correct level
  /*
  Array.from(rootEl?.querySelectorAll('p'))
  .filter(p => /^[#*]{1,6}$/.test(p.childNodes.item(0)?.nodeValue?.trim() || ''))
  .forEach(p => {
    let ptext = p.childNodes.item(0).nodeValue?.trim()
    let codeEl = p.querySelector('code')
    let heading = document.createElement(`h${ptext?.length}`)
    p.replaceWith(heading)
    if (codeEl) {
      let codeWrapper = document.createElement('p')
      heading.parentElement?.insertBefore(codeWrapper, heading.nextSibling)
    }
  })
  */

  Array.from(rootEl?.children || []).forEach(el => {
    if (el.tagName[0] === 'H' && isNumeric(el.tagName.slice(1))) {
      let heading = el
      let sectionLevel = parseInt(heading.tagName.slice(1))
      
      currentSection = document.createElement('section')
      currentSection.classList.add(`section${sectionLevel}`)
      if (heading.id) currentSection.id = heading.id
      if (heading.className) currentSection.className = heading.className
      /*
      Array.from(heading.classList).forEach(c => currentSection.classList.add(c))
      heading.className = ''
      let headingStyle = heading.getAttribute('style')
      if (headingStyle) {
        currentSection.setAttribute('style', headingStyle)
        heading.removeAttribute('style')
      }
      currentSection.id = heading.id || makeId(heading.textContent)
      if (heading.id) heading.removeAttribute('id')
      */

      currentSection.innerHTML += heading.outerHTML

      let headings = []
      for (let lvl = 1; lvl < sectionLevel; lvl++)
        headings = [...headings, ...Array.from(main.querySelectorAll(`H${lvl}`)).filter(h => h.parentElement.tagName === 'SECTION')]
      let parent = (sectionLevel === 1 || headings.length === 0) ? article : headings.pop()?.parentElement
      parent?.appendChild(currentSection)

    } else  {
      currentSection.innerHTML += el.outerHTML
    }
  })

  return main
}

export { restructure }