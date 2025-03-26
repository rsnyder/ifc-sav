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

The `audio` tag displays an audio player with a specified file.

`audio https://schh-commons.org/podcasts/sunsations-april-2025.mp3 #audioPlayer "SunSations April 2025 Podcast" large center`

Controls

- [Play](audioPlayer/play/1:00/1:05)
- [Pause](audioPlayer/pause)
- [Mute](audioPlayer/mute)
- [Sun City Chorus and Orchestra](audioPlayer/play/9:13)

## Properties

**[caption](#basic-example)** (_string_): Defines the text to use for a caption that is displayed below the video player.

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

