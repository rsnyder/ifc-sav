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

# Header

The `header` tag creates a full-width section in which a title and navigation links can be added.  The header is typically included at the top of a Markdown file.  The header includes a title bar which is aligned with the bottom-left of the header.  When navigation links are provided a navigation bar with aligned with the top-right of the header.  The header may also include a background image. 

## Title bar

If a title is specified a title bar will be positioned at the bottom of the header with a background color defined by `background` property and text color defined by the `color` property.

## Navigation bar

If navigation links are specified a navigation bar will be positioned at the top of the header with a background color defined by `background` property and text color defined by the `color` property.


## Properties

**[alpha](#examples)** (_float_):  The opacity level of the title bar when a background image is used.  The value is a number between 0 (no opacity) and 1.0 (full opacity). The default is 0.3.

**[background](#examples)** (_string_):  The background color used for the title bar.

**[color](#examples)** (_string_):  The color used for all text elements in the header, including the title and navigation links.

**[height](#examples)** (_integer_):  The header height; default is 150 pixels.

**[img](#examples)** (_url_):  The header background image.

**[title](#examples)** (_string_):  The header title text.

**[position](#examples)** (_string_):  Specifies the positioning of the background image within the header.  By default the image is centered both vertically and horizontally.  When using this property the X and Y positioning is defined, for instance ***"left center"*** for left horizontal alignment and centered vertical alignment, or ***"left bottom"*** for left horizontal alignment and bottom vertical alignment, etc..

**[bottom](#examples)** (_boolean_):  The bottom of the background image is aligned with the bottom of the header.

**[center](#examples)** (_boolean_):  The background image is centered, both vertically and horizontally within the header.

**[left](#examples)** (_boolean_):  The left side of the background image is aligned with the left side of the header.

**[right](#examples)** (_boolean_):  The right side of the background image is aligned with the right side of the header.

**[top](#examples)** (_boolean_):  The top of the background image is aligned with the top of the header.

Notes:
- Boolean properties are specified using the property name only, for instance - `center`.
- Non-boolean properties are specified using property=value syntax (i.e., `title=Example`).  If the value includes spaces the value must be quoted (i.e., `title="An Example"`).
- The URL value for the `img` property may be a full URL or a short form using recognized prefixes like `wc:` (for Wikimedia Commons hosted images) or `gh` (for GitHub hosted images).  If neither a full URL or prefixed value is used a relative URL is formed using the source Markdown file as the root.

## Examples

### Basic header

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
