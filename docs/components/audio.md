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

# Audio

The `audio` tag displays an HTML audio player with a specified file.

## Properties

**[caption](#basic-example)** (_string_): Defines the text to use for a caption that is displayed below the video player.

**[nocaption](#basic-examples)** (_boolean_):  This property inhibits the display of the caption at the bottom of the player.

**[src](#basic-example)** (_url_):  A URL to the audio file to play.

### Positioning properties

**[left](#positioning-examples)** (_boolean_):  Align the component with the left side of the window.  The components width is 50% of the window and any section text following the component tag will wrap around the component.

**[right](#positioning-examples)** (_boolean_):  Align the component with the right side of the window.  The components width is 50% of the window and any section text following the component tag will wrap around the component.

**[center](#positioning-examples)** (_boolean_):  The component is centered in the window.

**[large](#positioning-examples)** (_boolean_):  The component is sized to 75% of the window.

**[medium](#positioning-examples)** (_boolean_):  The component is sized to 50% of the window.

**[small](#positioning-examples)** (_boolean_):  The component is sized to 33% of the window.


## Examples

### Basic examples

#### Simple Audio player

#####
`.tabs`

###### Markdown

```markup
`audio https://upload.wikimedia.org/wikipedia/commons/6/65/Wikipedia_-_Earth_(spoken_by_AI_voice).mp3`
```

###### HTML

```html
<iframe
  src="https://ifc.juncture-digital.org/audio?src=https://upload.wikimedia.org/wikipedia/commons/6/65/Wikipedia_-_Earth_(spoken_by_AI_voice).mp3"
  allowfullscreen
></iframe>
```

###### Rendered

`audio https://upload.wikimedia.org/wikipedia/commons/6/65/Wikipedia_-_Earth_(spoken_by_AI_voice).mp3`


#### Using Wikimedia Commons "wc:"" Prefix

#####
`.tabs`

###### Markdown

```markup
`audio wc:Wikipedia_-_Earth_(spoken_by_AI_voice).mp3`
```

###### HTML

```html
<iframe
  src="https://ifc.juncture-digital.org/audio?src=wc:Wikipedia_-_Earth_(spoken_by_AI_voice).mp3"
  allowfullscreen
></iframe>
```

###### Rendered

`audio wc:Wikipedia_-_Earth_(spoken_by_AI_voice).mp3`


#### Using GitHub Hosted Audio File

#####
`.tabs`

###### Markdown

```markup
`audio gh:schh-commons/podcasts/main/SunSations_April_2025.mp3`
```

###### HTML

```html
<iframe
  src="https://ifc.juncture-digital.org/audio?src=gh:schh-commons/podcasts/main/SunSations_April_2025.mp3"
  allowfullscreen
></iframe>
```

###### Rendered

`audio gh:schh-commons/podcasts/main/SunSations_April_2025.mp3`