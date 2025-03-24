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

# YouTube

The `youtube` tag displays a YouTube video player with a specified video.

## Properties

**[alt](#basic-examples)** (_string_):  The text to use in the _alt_ tag used by screen readers.  If not provided an _alt_ tag is automatically generated from the IIIF manifest label property or inferred from the filename.

**[autoplay](#basic-example)** (_boolean_):  Automatically play video when the viewer is loaded.

**[caption](#basic-example)** (_string_): Defines the text to use for a caption that is displayed below the video player.

**[end](#basic-example)** (_string_):  Time position to stop playing, in `hh:mm:ss` format.

**[muted](#basic-example)** (_boolean_):  Mute video when initially played.

**[nocaption](#basic-examples)** (_boolean_):  This property inhibits the display of the caption at the bottom of the image.

**[poster](#basic-example)** (_url_):  Image displayed in viewer before video plays.

**[start](#basic-example)** (_string_):  Time position to begin playing, in `hh:mm:ss` format.

**[vid](#basic-example)** (_string_):  The YouTube ID of the image to stream

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

#### Simple YouTube player

#####
`.tabs`

###### Markdown

```markup
`youtube dQw4w9WgXcQ`
```

###### HTML

```html
<iframe
  src="https://ifc.juncture-digital.org/youtube?vid=dQw4w9WgXcQ"
  allowfullscreen
></iframe>
```

###### Rendered

`youtube dQw4w9WgXcQ`

### Positioning examples

#### Large and center

#####
`.tabs`

###### Markdown

```markup
`youtube dQw4w9WgXcQ large center`
```

###### HTML

```html
<iframe
  src="https://ifc.juncture-digital.org/youtube?vid=dQw4w9WgXcQ&large&center"
  allowfullscreen
></iframe>
```

###### Rendered

`youtube dQw4w9WgXcQ large center`


#### Right

#####
`.tabs`

###### Markdown

```markup
`youtube dQw4w9WgXcQ right`

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

###### HTML

```html
<iframe
  src="https://ifc.juncture-digital.org/youtube?vid=dQw4w9WgXcQ&right"
  allowfullscreen
></iframe>
```

###### Rendered

`youtube dQw4w9WgXcQ right`

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
