# Quick Start

## Using standard Iframes

Juncture Iframe components may be used in any HTML page using a standard HTML `iframe` tag.  When the Juncture IFC javascript is also loaded some CSS classes are available and interactivity with the Juncture Iframe components is also possible.

## Using Markdown tags

When using the Juncture Iframe Components with Markdown a simplified tagging syntax is available.  This requires the use of a Markdown-based framework (such as Jekyll) and some javascript code that enables the Markdown extensions used by Juncture IFC.

### Setup

When using the Markdown tagging syntax some javascript code must be loaded using the HTML script tag shown below.  Note that when using a Jekyll-powered site built from the Juncture IFC `website-template` this is already done for you.

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

Example when the Juncture IFC javascript is loaded.  In this case the classes `medium` and `center` are available.

```markup
  <iframe
    class="medium center"
    src="https://ifc.juncture-digital.org/image?src=wc:Sunflower_sky_backdrop.jpg"
  ></iframe>
```

When the Juncture IFC javascript is not loaded, all styling must be done explicitly using a `style` property on the iframe tag or elsewhere on the page.

```markup
  <iframe
    style="border:none; width:50%; aspect-ratio:0.84; margin:0 auto;"
    src="https://ifc.juncture-digital.org/image?src=wc:Sunflower_sky_backdrop.jpg"
  ></iframe>
```


#### Rendered

`image wc:Sunflower_sky_backdrop.jpg center medium`