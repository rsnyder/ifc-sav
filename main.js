const classes = new Set()
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
const setupActionLinks = () => {
  const actions = new Set('zoomto flyto play'.split(' '))
  document.querySelectorAll('a').forEach(a => {
    let href = a.href || a.getAttribute('data-href')
    let path = href?.split('/').slice(3).filter(p => p !== '#' && p !== '')
    if (actions.has(path[0])) {
      let action = path[0]
      let targetId = path[1]
      let args = path.slice(2)
      if (a.href) {
        a.setAttribute('data-href', href)
        a.removeAttribute('href')
        a.style.cursor = 'pointer'
        a.style.color = 'blue'
        a.addEventListener('click', () => { document.getElementById(targetId).contentWindow.postMessage({ action, args }, '*')})
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
const convertTags = () => {
  document.querySelectorAll('p code').forEach(code => {
    let tokens = []
    code.textContent.replace(/”/g,'"').replace(/”/g,'"').replace(/’/g,"'").match(/[^\s"]+|"([^"]*)"/gmi)?.filter(t => t).forEach(token => {
      if (tokens.length > 0 && tokens[tokens.length-1].indexOf('=') === tokens[tokens.length-1].length-1) tokens[tokens.length-1] = `${tokens[tokens.length-1]}${token}`
      else tokens.push(token)
    })
    let parsed = parseCodeEl(code)
    let componentArgs = [...Object.entries(parsed.kwargs || {}).map(([key, value]) => `${key}=${value}`), ...(parsed.booleans || [])].join('&')
    let iframe = document.createElement('iframe')
    if (parsed.id) iframe.id = parsed.id
    iframe.setAttribute('allowfullscreen', '')
    iframe.src = `${parsed.tag}?${componentArgs}`
    code.parentElement.replaceWith(iframe)
  })}

new MutationObserver(() => {
  convertTags()
  setupActionLinks()
}).observe(document.documentElement || document.body, { childList: true, subtree: true, characterData: true })

