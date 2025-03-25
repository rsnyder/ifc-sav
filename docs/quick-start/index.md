# Quick Start

## Using standard Iframes

## Using Markdown tags

WHen using the Juncture Iframe Components with Markdown a simplified tagging syntax is available.  This requires a 

### Setup

When using the Markdown tagging syntax some javascript code must be loaded using the HTML script tag shown below.  Note that when using a site built from the Juncture IFC `website-template` this is already done for you.

```html
<script src="https://ifc.juncture-digital.org/js/index.js" type="module"></script>
```

## Example

### An example
`.tabs`

#### Markdown

```markup
`image wc:Sunflower_sky_backdrop.jpg center medium`
```

#### HTML

```markup
<iframe
  src="https://ifc.juncture-digital.org/image?src=wc:Sunflower_sky_backdrop.jpg"
></iframe>
```

#### Rendered

`image wc:Sunflower_sky_backdrop.jpg center medium`