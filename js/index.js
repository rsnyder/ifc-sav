import 'https://cdn.jsdelivr.net/npm/js-md5@0.8.3/src/md5.min.js'
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.18.0/cdn/components/breadcrumb/breadcrumb.js';
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.18.0/cdn/components/breadcrumb-item/breadcrumb-item.js';
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.18.0/cdn/components/card/card.js';
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.18.0/cdn/components/details/details.js';
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.18.0/cdn/components/dropdown/dropdown.js';
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.18.0/cdn/components/tab/tab.js';
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.18.0/cdn/components/tab-group/tab-group.js';
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.18.0/cdn/components/tab-panel/tab-panel.js';

const isGHP = location.hostname.indexOf('github.io') > 0

const classes = new Set('left right center medium small box-shadow'.split(' '))
const components = {
  aichat: {
    booleans: 'nocaption',
    positional: 'model'
  },
  chatlog: {
    positional: 'src'
  },
  'google-book': {
    booleans: 'nocaption',
    positional: 'id caption'
  },
  header: {
    booleans: '',
    positional: '',
    disabled: true
  },
  'ia-book': {
    booleans: 'cover nocaption showannos static',
    positional: 'id caption'
  },
  iframe: {
    positional: 'src'
  },
  'iiif-tify': {
    booleans: 'cover nocaption',
    positional: 'manifest caption'
  },
  'iiif-juncture': {
    booleans: 'cover nocaption showannos static',
    positional: 'src caption',
    aliases: 'iiif'
  },
  image: {
    booleans: 'cover nocaption static',
    positional: 'src label'
  },
  map: {
    booleans: 'marker nocaption',
    positional: 'location caption'
  },
  youtube: {
    booleans: 'autoplay muted nocaption',
    positional: 'vid caption',
    aliases: 'video'
  }
}
const tagMap = {}
Object.entries(components).forEach(([tag, attrs]) => {
  let tagObj = { 
    tag,
    booleans : new Set((attrs.booleans || '').split(' ').filter(s => s)),
    positional: (attrs.positional || '').split(' ').filter(s => s),
    disabled: attrs.disabled || false
  }
  tagMap[tag] = tagObj
  if (attrs.aliases) {
    attrs.aliases.split(' ').forEach(alias => tagMap[alias] = tagObj)
  }
})

const makeEntityPopups = (rootEl) => {
  Array.from(rootEl.querySelectorAll('a')).forEach(async a => {
    let path = a.href?.split('/').slice(3).filter(p => p !== '#' && p !== '')
    let qid = path?.find(p => /^Q\d+$/.test(p))
    if (qid) {
      let entity = await getEntity(qid)
      let dd = document.createElement('sl-dropdown')
      dd.className = 'entity-popup'
      dd.setAttribute('placement', 'top')
      dd.setAttribute('distance', '12')
      
      let trigger = document.createElement('div')
      trigger.setAttribute('slot', 'trigger')
      trigger.innerHTML = a.textContent
      dd.appendChild(trigger)

      let card = document.createElement('sl-card')
      card.setAttribute('hoist', '')
      let img = document.createElement('img')
      img.setAttribute('slot', 'image')
      img.src = entity.thumbnail
      img.setAttribute('alt', entity.label)
      card.appendChild(img)
      let content = document.createElement('div')
      content.className = 'content'
      if (entity.label) {
        let heading = document.createElement('h2')
        heading.textContent = entity.label
        content.appendChild(heading)
      }
      if (entity.description) {
        let description = document.createElement('p')
        description.className = 'description'
        description.innerHTML = entity.description
        content.appendChild(description)
      }
      if (entity.summaryText) {
        let summaryText = document.createElement('p')
        summaryText.className = 'description'
        summaryText.innerHTML = entity.summaryText
        content.appendChild(summaryText)
      }
      card.appendChild(content)
      let footer = document.createElement('div')
      footer.setAttribute('slot', 'footer')
      footer.innerHTML = `<a href="https://www.wikidata.org/wiki/${qid}" target="_blank">View on Wikidata</a>`
      card.appendChild(footer)
      dd.appendChild(card)
      
      a.replaceWith(dd)
    }
  })
}

// setup action links to iframes on DOM mutations (e.g., zoomto, flyto, play)
const setupActionLinks = (targetId) => {
  document.querySelectorAll('a').forEach(a => {
    let href = a.href || a.getAttribute('data-href')
    let path = href?.split('/').slice(3).filter(p => p !== '#' && p !== '')
    const targetIdx = path?.findIndex(p => p == targetId)
    if (targetIdx >= 0) {
      path = path.slice(targetIdx)
      let action = path[1]
      let args = path.slice(2)
      if (a.href) {
        a.setAttribute('data-href', href)
        a.removeAttribute('href')
        a.style.cursor = 'pointer'
        a.style.color = 'blue'
        a.addEventListener('click', () => {
          let msg = { event: 'action', action, args }
          document.getElementById(targetId)?.contentWindow.postMessage(JSON.stringify(msg), '*')
        })
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
    else if ((token[0] === '.' && token[1] !== '.') || classes.has(token)) {
      let className = token.replace(/^\./,'')
      if (parsed.class) parsed.class += ` ${className}`
      else parsed.class = className
    }
    else if (/#\w+/.test(token)) parsed['id'] = token.slice(1)
      else if (/^Q\d+$/.test(token) && !parsed.tag) { // entity identifier
        if (!parsed.entities) parsed.entities = []
        parsed.entities.push(token)
      }
    else {
      let arg = token[0] === '"' ? token.slice(1,-1) : token
      if (tokenIdx === 0 && tagMap[arg]) {
        tagObj = tagMap[arg]
        parsed.tag = tagObj.tag
      } else if (tagObj?.booleans.has(arg)) {
        if (!parsed.booleans) parsed.booleans = []
        parsed.booleans.push(arg)
      } else {
        args.push(arg)
      }
    }
    tokenIdx++
  }
  if (tagObj?.positional?.length > 0) {
    for (let idx = 0; idx < tagObj.positional.length; idx++) {
      if (args[idx]) {
        if (!parsed.kwargs) parsed.kwargs = {}
        parsed.kwargs[tagObj.positional[idx]] = args[idx]
        delete args[idx]
      } else {
        break
      }
    }
    parsed.args = Object.values(args)
  }

  let parent = el.parentElement
  let nonCodeChildren = Array.from(parent.childNodes).filter(c => c.textContent.trim()).filter(c => c.tagName !== 'CODE')
  parsed.inline = nonCodeChildren.length > 0
  // console.log(parsed)

  if (parent?.nextElementSibling?.tagName === 'UL' && parent?.nextElementSibling?.getAttribute('data') === '')
    parsed.kwargs.data = encodeURIComponent(parent.nextElementSibling.outerHTML.trim().replace(/\n/g, ''))

  return parsed
}

const makeBreadcrumbs = () => {
  // let path = location.pathname.split('/').filter(p => p !== '').slice(isGHP ? 1 : 0)
  let path = location.pathname.split('/').filter(p => p !== '')
  let breadcrumbs = document.createElement('sl-breadcrumb')
  if (!isGHP) {
    let breadcrumb = document.createElement('sl-breadcrumb-item')
    breadcrumb.textContent = 'home'
    breadcrumb.setAttribute('href', '/')
    breadcrumbs.appendChild(breadcrumb)
  }
  path.forEach((p, idx) => {
    let breadcrumb = document.createElement('sl-breadcrumb-item')
    let label = idx === 0 && isGHP ? 'home' : p
    let href = (idx < path.length - 1) ? `/${path.slice(0,idx+1).join('/')}` : null
    breadcrumb.textContent = label
    if (href) breadcrumb.setAttribute('href', href)
    breadcrumbs.appendChild(breadcrumb)
  })
  return breadcrumbs
}

const ghBase = () => {
  if (window.ghbase) return window.ghbase
  else if (window.jekyll?.site?.github?.owner_name) {
    let owner = window.jekyll.site.github.owner_name
    let repo = window.jekyll.site.github.repository_name
    let branch = window.jekyll.site.github.source.branch
    return `${owner}/${repo}/${branch}`
  }
}

// convert <code> tags to HTML iframe elements
const convertTags = (rootEl) => {
  let base = document.querySelector('base')?.getAttribute('href')
  rootEl.querySelectorAll('code').forEach(code => {
    if (code.textContent === 'breadcrumbs') {
      code.parentElement.replaceWith(makeBreadcrumbs())
      return
    }
    let tokens = []
    code.textContent.replace(/”/g,'"').replace(/”/g,'"').replace(/’/g,"'").match(/[^\s"]+|"([^"]*)"/gmi)?.filter(t => t).forEach(token => {
      if (tokens.length > 0 && tokens[tokens.length-1].indexOf('=') === tokens[tokens.length-1].length-1) tokens[tokens.length-1] = `${tokens[tokens.length-1]}${token}`
      else tokens.push(token)
    })
    let ifcPrefix = location.hostname === 'localhost' ? 'http://localhost:8080' : 'https://ifc.juncture-digital.org/'
    let parsed = parseCodeEl(code)
    if (!parsed.tag || tagMap[parsed.tag].disabled || parsed.inline ) return
    if (base) {
      if (!parsed.kwargs) parsed.kwargs = {}
      parsed.kwargs.base = base
    }
    let ghBasePath = ghBase()
    if (ghBasePath) parsed.kwargs.ghbase = ghBasePath
    // (parsed)

    let iframe = document.createElement('iframe')
    iframe.setAttribute('allowfullscreen', '')
    iframe.setAttribute('allow', 'clipboard-write')
    if (parsed.id) iframe.id = parsed.id
    if (parsed.class) iframe.className = parsed.class
    if (parsed.style) applyStyle(iframe, parsed.style)

    if (parsed.tag === 'iframe') {
      Object.entries(parsed.kwargs || {})
        .filter((key) => !['id', 'class', 'style'].includes(key))
        .forEach(([key, value]) => iframe.setAttribute(key, value))
    } else {
      let componentArgs = [...Object.entries(parsed.kwargs || {}).map(([key, value]) => `${key}=${value}`), ...(parsed.booleans || [])].join('&')
      iframe.src = `${ifcPrefix}/${parsed.tag}?${componentArgs}`
    }
    let isOnlyChild = code.parentElement.children.length === 1 && code.parentElement.children[0] === code
    if (isOnlyChild) code.parentElement.replaceWith(iframe)
    else {
      let nonCodeElements = Array.from(code.parentElement.children).filter(c => c.tagName !== 'CODE').length
      if (!nonCodeElements) {
        code.parentElement.style.display = 'flex'
        code.parentElement.style.gap = '1em'
      }
      code.replaceWith(iframe)
    }
  })
}

const makeDetails = (rootEl) => {
  rootEl.querySelectorAll('section.details').forEach(section => {
    let heading = section.querySelector('h1, h2, h3, h4, h5, h6')?.textContent
    let details = document.createElement('sl-details')
    details.setAttribute('summary', heading)
    Array.from(section.children).slice(1).forEach(child => details.appendChild(child))
    section.replaceWith(details)
  })
}

const makeTabs = (rootEl) => {
  rootEl.querySelectorAll('section.tabs').forEach(section => {
    let tabGroup = document.createElement('sl-tab-group');
    Array.from(section.classList).forEach(cls => tabGroup.classList.add(cls))
    Array.from(section.attributes).forEach(attr => tabGroup.setAttribute(attr.name, attr.value))
    
    Array.from(section.querySelectorAll(':scope > section'))
    .forEach((tabSection, idx) => {
      let tab = document.createElement('sl-tab')
      tab.setAttribute('slot', 'nav')
      tab.setAttribute('panel', `tab${idx+1}`)
      if (idx === 0) tab.setAttribute('active', '')
      tab.innerHTML = tabSection.querySelector('h1, h2, h3, h4, h5, h6')?.innerHTML || ''
      tabGroup.appendChild(tab)      
    })

    Array.from(section.querySelectorAll(':scope > section'))
    .forEach((tabSection, idx) => {
      let tabPanel = document.createElement('sl-tab-panel')
      tabPanel.setAttribute('name', `tab${idx+1}`)
      if (idx === 0) tabPanel.setAttribute('active', '')
      let tabContent = Array.from(tabSection.children).slice(1).map(el => el.outerHTML).join(' ')
      tabPanel.innerHTML = tabContent
      tabGroup.appendChild(tabPanel)
    })

    section.replaceWith(tabGroup)
  })
}

let cardCtr = 0
const makeCards = (rootEl) => {
  rootEl.querySelectorAll('section.cards').forEach(section => {
    if (!section.classList.contains('wrapper')) {
      section.classList.remove('cards')
      let wrapper = document.createElement('section')
      wrapper.className = 'cards wrapper'
      Array.from(section.children).slice(1).forEach(card => {
        wrapper.appendChild(card)
        card.classList.add('card')
        let heading = card.querySelector('h1, h2, h3, h4, h5, h6')
        let img = card.querySelector('p > img')
        let link
        if (card.getAttribute('href')) {
          link = document.createElement('a')
          link.href = card.getAttribute('href')
          link.textContent = heading?.textContent
          card.appendChild(link)
          card.removeAttribute('href')
        }
        if (img) {
          img.parentElement?.replaceWith(img)
        } else {
          let veImage = card.querySelector('ve-image')
          if (veImage) {
            veImage.setAttribute('static', '')
            veImage.setAttribute('no-caption', '')
          }
        }
        if (!link) {
          link = card.querySelector('p > a')
          if (link) {
            link.textContent = heading?.textContent || link.textContent
            link.parentElement?.replaceWith(link)
          }
        }
        heading.remove()
        card.querySelectorAll('p').forEach(p => {
          ++cardCtr
          let readMoreWrapper = document.createElement('div')
          readMoreWrapper.className = 'read-more'
          let input = document.createElement('input')
          input.setAttribute('type', 'checkbox')
          input.id = `read-more-${cardCtr}`
          readMoreWrapper.appendChild(input)
          let para = document.createElement('p')
          para.innerHTML = p.innerHTML
          readMoreWrapper.appendChild(para)
          let label = document.createElement('label')
          label.setAttribute('for', `read-more-${cardCtr}`)
          label.setAttribute('role', 'button')
          label.innerHTML = 'More'
          readMoreWrapper.appendChild(label)
          p.replaceWith(readMoreWrapper)
        })
      })
      section.appendChild(wrapper)
    }
  })
}

const makeColumns = (rootEl) => {
  rootEl.querySelectorAll('section.cards').forEach(section => {
    if (!section.classList.contains('wrapper')) {
      let wrapper = document.createElement('section')
      wrapper.className = 'columns wrapper'
      section.classList.remove('columns')
      Array.from(section.childNodes)
        .filter(c => c.tagName[0] !== 'H')
        .forEach((col, idz) => {
          wrapper.appendChild(col)
          col.classList.add(`col-${idz+1}`)
      })
      section.appendChild(wrapper)
    }
  })
}

let main = document.querySelector(window.contentSelector || 'main.ghp')
let nutationObserver

if (main) {
  new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      Array.from(mutation.addedNodes).filter(node => node.tagName === 'IFRAME').forEach(iframe => {
        if (iframe.id) setupActionLinks(iframe.id)
      })
    })
  }).observe(document.documentElement || document.body, { childList: true, subtree: true, characterData: true })
  let restructured = restructure(main)
  main.replaceWith(restructured)
  convertTags(restructured)
  makeDetails(restructured)
  makeTabs(restructured)
  makeCards(restructured)
  makeColumns(restructured)
  makeEntityPopups(restructured)

} else {
  let processing = false
  nutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      // console.log(mutation.target)
      // if (processing) return
      if (mutation.target.classList.contains('markdown-section') || mutation.target.classList.contains('page-content')) {
        processing = true
        let restructured = restructure(mutation.target)
        // restructured.style.height = '80dvh'
        restructured.id = mutation.target.id
        restructured.className = mutation.target.className
        restructured.classList.add('markdown-body')
        // restructured.classList.remove('markdown-section')
        mutation.target.replaceWith(restructured)
        convertTags(restructured)
        makeDetails(restructured)
        makeTabs(restructured)
        makeCards(restructured)
        makeColumns(restructured)
        makeEntityPopups(restructured)
        nutationObserver?.disconnect()
      } else if ( ['ARTICLE', 'BODY'].includes(mutation.target.tagName) ) {
        // console.log(mutation.target.tagName)
        processing = true
        convertTags(mutation.target)
        nutationObserver?.disconnect()
      }
      mutation.target.querySelectorAll('iframe').forEach(iframe => {
        // console.log(iframe)
        if (iframe.id) setupActionLinks(iframe.id)
      })
    })
  }).observe(document.documentElement || document.body, { childList: true, subtree: true, characterData: true })

}
window.addEventListener('message', (event) => {
  if (event.data.type === 'setAspect') {
    const sendingIframe = Array.from(document.querySelectorAll('iframe')).find((iframe) => iframe.contentWindow === event.source)
    if (sendingIframe) sendingIframe.style.aspectRatio = event.data.aspect
  } else if (event.data.type === 'openLink') {
    window.open(event.data.url, '_blank')
  }
})

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
  let html = rootEl.innerHTML.replace(/<p><code>(.+)<\/code><\/p>\s+<ul>/g, '<p><code>$1</code></p><ul data style="display:none;">')
  rootEl.innerHTML = html

  // Converts empty headings (changed to paragraphs by markdown converter) to headings with the correct level
  Array.from(rootEl?.querySelectorAll('p'))
  .filter(p => /^[#*]{1,6}$/.test(p.childNodes.item(0)?.nodeValue?.trim() || ''))
  .forEach(p => {
    let ptext = p.childNodes.item(0).nodeValue?.trim()
    let codeEl = p.querySelector('code')
    let heading = document.createElement(`h${ptext?.length}`)
    if (codeEl) {
      const parsed = parseCodeEl(codeEl)
      if (parsed.class) heading.className = parsed.class
      if (parsed.id) heading.id = parsed.id
      if (parsed.style) applyStyle(heading, parsed.style)
      if (parsed.kwargs) for (const [k,v] of Object.entries(parsed.kwargs)) heading.setAttribute(k, v === 'true' ? '' : v)
    }
    p.replaceWith(heading)
  })

  // remove "view as" buttons
  Array.from(rootEl.querySelectorAll('a > img'))
  .map(img => img.parentElement)
  .find(link => link.href.indexOf('juncture-digital.org') > 0)
  ?.parentElement?.remove()

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

  Array.from(rootEl?.querySelectorAll('.anchor'))
  .forEach(a => { a.parentElement.innerHTML = a.textContent})

  rootEl.querySelectorAll('code').forEach(codeEl => {
    if (codeEl.parentElement.tagName === 'PRE') return
    let parsed = parseCodeEl(codeEl)
    if (parsed.tag || (!parsed.id && !parsed.class && !parsed.style && !parsed.kwargs)) return
    codeEl = (codeEl.parentElement.tagName === 'P' && codeEl.parentElement.childNodes.length === 1 && codeEl.parentElement.childNodes[0] === codeEl) ? codeEl.parentElement : codeEl
    let parentEl = codeEl.parentElement
    let priorEl = codeEl.previousElementSibling
    let target
    if (priorEl?.tagName?.[0] === 'H') target = priorEl
    else if (['A', 'STRONG', 'EM', 'MARK'].includes(priorEl?.tagName)) target = priorEl
    else if (parentEl?.tagName === 'LI') target = parentEl.parentElement
    else target = parentEl
    if (parsed.class) target.className = parsed.class
    if (parsed.id) target.id = parsed.id
    if (parsed.style) applyStyle(target, parsed.style)
    if (parsed.kwargs) for (const [k,v] of Object.entries(parsed.kwargs)) target.setAttribute(k, v === 'true' ? '' : v)
    codeEl.remove()
  })

  let main = document.createElement('main')

  // main.className = 'page-content markdown-body'
  main.className = 'markdown-body'
  main.setAttribute('aria-label', 'Content')
  main.setAttribute('data-theme', 'light')

  let styleSheet = rootEl.querySelector('style')
  if (styleSheet) main.appendChild(styleSheet.cloneNode(true))

  // let article = document.createElement('article')
  // main.appendChild(article)
  // let currentSection = article;

  let currentSection = main;

  rootEl = rootEl.querySelector('body') || rootEl
  rootEl.classList.forEach(cls => main.classList.add(cls))

  Array.from(rootEl?.children || []).forEach(el => {
    if (el.tagName[0] === 'H' && isNumeric(el.tagName.slice(1))) {
      let heading = el
      let sectionLevel = parseInt(heading.tagName.slice(1))
      
      currentSection = document.createElement('section')
      currentSection.classList.add(`section${sectionLevel}`)
      if (heading.id) currentSection.id = heading.id
      if (heading.className) currentSection.className = heading.className
      if (!heading.textContent) heading.style.display = 'none'
      heading.removeAttribute('id')
      heading.removeAttribute('class')
      currentSection.innerHTML += heading.outerHTML

      let headings = []
      for (let lvl = 1; lvl < sectionLevel; lvl++)
        headings = [...headings, ...Array.from(main.querySelectorAll(`H${lvl}`)).filter(h => h.parentElement.tagName === 'SECTION')]
      // let parent = (sectionLevel === 1 || headings.length === 0) ? article : headings.pop()?.parentElement
      let parent = (sectionLevel === 1 || headings.length === 0) ? main : headings.pop()?.parentElement
      parent?.appendChild(currentSection)

    } else  {
      currentSection.innerHTML += el.outerHTML
    }
  })

  return main
}

////////// Wikidata Entity functions //////////

async function getEntityData(qids, language) {
  if (!window.entityData) window.entityData = {}
  if (!window.pendingEntityData) window.pendingEntityData = new Set()
  if (!window.customEntityAliases) window.customEntityAliases = {}
  language = language || 'en'
  let cached = new Set(qids.filter(qid => window.entityData[qid]))
  let pending = new Set(qids.filter(qid => window.pendingEntityData.has(qid)))
  let toGet = qids .filter(qid => !cached.has(qid) && !pending.has(qid))
  if (toGet.length > 0) {
    Array.from(toGet).forEach(qid => window.pendingEntityData.add(qid))
    let toGetUrls = toGet.map(qid => `(<http://www.wikidata.org/entity/${qid}>)`)
    let query = `
      SELECT ?item ?label ?description ?alias ?image ?logoImage ?coords ?pageBanner ?whosOnFirst ?wikipedia WHERE {
        VALUES (?item) { ${toGetUrls.join(' ')} }
        ?item rdfs:label ?label . 
        FILTER (LANG(?label) = "${language}" || LANG(?label) = "en")
        OPTIONAL { ?item schema:description ?description . FILTER (LANG(?description) = "${language}" || LANG(?description) = "en")}
        OPTIONAL { ?item skos:altLabel ?alias . FILTER (LANG(?alias) = "${language}" || LANG(?alias) = "en")}
        OPTIONAL { ?item wdt:P625 ?coords . }
        OPTIONAL { ?item wdt:P18 ?image . }
        OPTIONAL { ?item wdt:P154 ?logoImage . }
        OPTIONAL { ?item wdt:P948 ?pageBanner . }
        OPTIONAL { ?item wdt:P6766 ?whosOnFirst . }
        OPTIONAL { ?wikipedia schema:about ?item; schema:isPartOf <https://${language}.wikipedia.org/> . }
    }`
    let resp = await fetch('https://query.wikidata.org/sparql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json'
      },
      body: `query=${encodeURIComponent(query)}`
    })
    if (resp.ok) {
      let sparqlResp = await resp.json()
      sparqlResp.results.bindings.forEach( async rec => {
        let qid = rec.item.value.split('/').pop()
        let _entityData = window.entityData[qid]
        if (!_entityData) {
          _entityData = {id: qid, label: rec.label.value}
          if (rec.description) _entityData.description = rec.description.value
          if (rec.alias) {
            _entityData.aliases = [rec.alias.value]
            if (window.customEntityAliases[qid]) _entityData.aliases = [...window.customEntityAliases[qid], ..._entityData.aliases]
          }
          if (rec.coords) _entityData.coords = rec.coords.value.slice(6,-1).split(' ').reverse().join(',')
          if (rec.wikipedia) _entityData.wikipedia = rec.wikipedia.value
          if (rec.pageBanner) _entityData.pageBanner = rec.pageBanner.value
          if (rec.image) {
            _entityData.image = rec.image.value
            _entityData.thumbnail = mwImage(rec.image.value, 300)
          }
          if (rec.logoImage) {
            _entityData.logoImage = rec.logoImage.value
            if (!_entityData.thumbnail) _entityData.thumbnail = mwImage(rec.logoImage.value, 300)
          }
          // if (rec.whosOnFirst) _entityData.whosOnFirst = whosOnFirstUrl(rec.whosOnFirst.value)
          if (rec.whosOnFirst) _entityData.geojson = whosOnFirstUrl(rec.whosOnFirst.value)
              window.entityData[qid] = _entityData

        } else {
          if (rec.alias) _entityData.aliases.push(rec.alias.value)
        }
      })
      // return entityData
      Array.from(toGet).forEach(qid => window.pendingEntityData.delete(qid))
      return Object.fromEntries(qids.filter(qid => window.entityData[qid]).map(qid => [qid,window.entityData[qid]]))
    }
  }
  // return entityData
  return Object.fromEntries(qids.filter(qid => window.entityData[qid]).map(qid => [qid,window.entityData[qid]]))
}

const getSummaryText = async (wikipediaLink, language) => {
  language = language || 'en'
  let page = wikipediaLink.replace(/\/w\//, '/wiki').split('/wiki/').pop()
  let resp = await fetch(`https://${language}.wikipedia.org/api/rest_v1/page/summary/${page}`)
  if (resp.ok) {
    let data = await resp.json()
    return data['extract_html'] || data['extract']
  }
}

function mwImage(mwImg, width) {
  width = width || 0
  // Converts Wikimedia commons image URL to a thumbnail link
  mwImg = (Array.isArray(mwImg) ? mwImg[0] : mwImg).replace(/Special:FilePath\//, 'File:').split('File:').pop()
  mwImg = decodeURIComponent(mwImg).replace(/ /g,'_')
  const _md5 = md5(mwImg)
  const extension = mwImg.split('.').pop()
  let url = `https://upload.wikimedia.org/wikipedia/commons${width ? '/thumb' : ''}`
  url += `/${_md5.slice(0,1)}/${_md5.slice(0,2)}/${mwImg}`
  if (width > 0) {
    url += `/${width}px-${mwImg}`
    if (extension === 'svg') {
      url += '.png'
    } else if (extension === 'tif' || extension === 'tiff') {
      url += '.jpg'
    }
  }
  return url
}

// Creates a GeoJSON file URL from a Who's on First ID 
function whosOnFirstUrl(wof) {
  let wofParts = []
  for (let i = 0; i < wof.length; i += 3) {
    wofParts.push(wof.slice(i,i+3))
  }
  return `https://data.whosonfirst.org/${wofParts.join('/')}/${wof}.geojson`
}

// For cropping regular images
export async function imageDataUrl(url, region, dest) {
  return new Promise((resolve) => {
    let {x, y, w, h} = region
    let {width, height} = dest

    let image = new Image()
    image.crossOrigin = 'anonymous'
    x = x ? x/100 : 0
    y = y ? y/100 : 0
    w = w ? w/100 : 0
    h = h ? h/100 : 0

    image.onload = () => {
      let sw = image.width
      let sh = image.height
      let swScaled = w > 0 ? sw * w : sw - (sw * x)
      let shScaled =  h > 0 ? sh * h : sh - (sh * y)
      let ratio = swScaled/shScaled
      if (ratio > 1) height = width/ratio
      else width = height * ratio
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = width
      canvas.height = height
      x = x*sw
      y = y*sh
      ctx?.drawImage(image, x, y, swScaled, shScaled, 0, 0, width, height)
      let dataUrl = canvas.toDataURL()
      resolve(dataUrl)
    }
    image.src = url

  })
}

async function getEntity(qid, language) {
  language = language || 'en'
  let entities = await getEntityData([qid], language)
  let entity = entities[qid]
  if (!entity.summaryText && entity.wikipedia) {
    entity.summaryText = await getSummaryText(entity.wikipedia, language)
  }
  return entities[qid]
}

export { restructure, convertTags, makeEntityPopups }