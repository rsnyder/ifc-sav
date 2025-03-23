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

The `youtube` tag displays a YouTube video player with a specified video.

## Properties

**[alt](#examples)** (_string_):  

**[autoplay](#examples)** (_boolean_):  

**[caption](#examples)** (_string_):  

**[end](#examples)** (_string_):  

**[muted](#examples)** (_boolean_):  

**[nocaption](#examples)** (_boolean_):  

**[poster](#examples)** (_url_):  

**[start](#examples)** (_string_):  

**[vid](#examples)** (_string_):  

Notes:
- Boolean properties are specified using the property name only, for instance - `marker`.
- Non-boolean properties are specified using property=value syntax (i.e., `caption=Example`).  If the value includes spaces the value must be quoted (i.e., `caption="An Example Map"`).

## Examples

### Basic map

Displays a map with a caption and marker.

####
`.tabs`

##### Markdown

```markup
`youtube dQw4w9WgXcQ`
```

##### HTML

```html
<iframe
  src="https://ifc.juncture-digital.org/youtube?vid=dQw4w9WgXcQ"
  allowfullscreen
></iframe>
```

##### Rendered

`youtube dQw4w9WgXcQ`
