<style> 
  .markdown-section h2 ~ p > strong > a, .markdown-section h3 ~ p > strong > a { color: crimson; font-size: 110%; text-decoration: none; }
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

# Google Book

The `google-book` tag displays a Google Book viewer with a specified book.

## Properties

**[id](#basic-examples)** (_string_):  Google book ID

**[caption](#basic-example)** (_string_): Defines the text to use for a caption that is displayed below the viewer.

**[nocaption](#basic-examples)** (_boolean_):  This property inhibits the display of the caption at the bottom of the image.

**[page](#basic-example)** (_boolean_):  

**[pageid](#basic-example)** (_boolean_):  

### Positioning properties

**[left](#positioning-examples)** (_boolean_):  Align the component with the left side of the window.  The components width is 50% of the window and any section text following the component tag will wrap around the component.

**[right](#positioning-examples)** (_boolean_):  Align the component with the right side of the window.  The components width is 50% of the window and any section text following the component tag will wrap around the component.

**[center](#positioning-examples)** (_boolean_):  The component is centered in the window.

**[large](#positioning-examples)** (_boolean_):  The component is sized to 75% of the window.

**[medium](#positioning-examples)** (_boolean_):  The component is sized to 50% of the window.

**[small](#positioning-examples)** (_boolean_):  The component is sized to 33% of the window.


Notes:
- Boolean properties are specified using the property name only, for instance - `marker`.
- Non-boolean properties are specified using property=value syntax (i.e., `caption=Example`).  If the value includes spaces the value must be quoted (i.e., `caption="An Example Map"`).


## Examples

### Basic examples

#### Simple viewer

#####
`.tabs`

###### Markdown

```markup
`google-book cDBgAAAAcAAJ "Mattioli Herbal - 1604" page=PP7 :aspect-ratio=0.62 medium center`
```

###### HTML

```html
<iframe
  src="https://ifc.juncture-digital.org/google-book?id=cDBgAAAAcAAJ&page=PP7&caption=Mattioli+Herbal+-+1604"
  allowfullscreen
></iframe>
```

###### Rendered

`google-book cDBgAAAAcAAJ "Mattioli Herbal - 1604" page=PP7 :aspect-ratio=0.62 medium center`

##

`google-book cDBgAAAAcAAJ "Mattioli Herbal - 1604" page=PP7 :aspect-ratio=0.62 medium center`
