<style> 
  .markdown-section h2 ~ p > strong > a { color: crimson; font-size: 110%; text-decoration: none; }
  .markdown-section table { 
    margin-left:3rem; 
    width: calc(100% - 6rem); 
    border:1px solid #555;
  }
  .markdown-section td, .markdown-section th {
    border:1px solid #555;
    padding: 8px;
    line-height: 1.2;
  }
  .markdown-section th {
    background-color:#E2F0F7;
    font-weight:bold !important;
    text-align:center !important;
  }
</style>

# Map

The `map` tag creates ...

## Properties

**[location](#examples)** (_string_):  

**[marker](#examples)** (_boolean_):  

**[caption](#examples)** (_string_):  

Notes:
- Boolean properties are specified using the property name only, for instance - `marker`.
- Non-boolean properties are specified using property=value syntax (i.e., `caption=Example`).  If the value includes spaces the value must be quoted (i.e., `caption="An Example Map"`).

## Examples

### Basic map

Displays a title with default background.

####
`.tabs`

##### Markdown

```markup
`header "Monument Valley"`
```

##### HTML

```html
<iframe
  src="https://ifc.juncture-digital.org/header?title=Monument+Valley"
  allowfullscreen
></iframe>
```

##### Rendered

`header "Monument Valley"`


### Header with background image

####
`.tabs`

##### Markdown

```markup
`header "Monument Valley" wc:Monument_Valley_banner.jpg`
```

##### HTML

```markup
<iframe
  src="https://ifc.juncture-digital.org/header?title=Monument+Valley&img=wc:Monument_Valley_banner.jpg"
  allowfullscreen
></iframe>
```

##### Rendered

`header "Monument Valley" wc:Monument_Valley_banner.jpg`


### Header with background image, title and navigation

####
`.tabs`

##### Markdown

```markup
`header "Monument Valley" wc:Monument_Valley_banner.jpg`
- [Home](/)
- [About](/about)
```

##### HTML

```markup
<iframe
  src="https://ifc.juncture-digital.org/header?title=Monument+Valley&img=wc:Monument_Valley_banner.jpg&data=<ul><li><a href=\"/\">Home</a></li><li><a href=\"/about\">About</a></li></ul>"
  allowfullscreen
></iframe>
```

##### Rendered

`header "Monument Valley" wc:Monument_Valley_banner.jpg`
- [Home](/)
- [About](/about)

### Header with background image and navigation

####
`.tabs`

##### Markdown

```markup
`header img=wc:Monument_Valley_banner.jpg`
- [Home](/)
- [About](/about)
```

##### HTML

```markup
<iframe
  src="https://ifc.juncture-digital.org/header?img=wc:Monument_Valley_banner.jpg&data=<ul><li><a href=\"/\">Home</a></li><li><a href=\"/about\">About</a></li></ul>"
  allowfullscreen
></iframe>
```

##### Rendered

`header img=wc:Monument_Valley_banner.jpg`
- [Home](/)
- [About](/about)
