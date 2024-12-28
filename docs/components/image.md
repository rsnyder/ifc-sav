# Image

## Examples

### Wikimedia Commons example

This basic example uses an image hosted by Wikimedia Commons.  When using Wikimedia Commons images the `wc:` prefix may be used instead of the full URL and image information (title, description. attribution, etc) is automatically retrieved from the Wikimedia Commons site and added to the viewer.  Click on the <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" height="1em" width="1em"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg> icon in the caption to see the image info.

####
`.tabs`

##### Markdown

```markup
`image wc:Incense_in_Vietnam.jpg medium center box-shadow`
```

##### HTML

```markup
<iframe
  src="image?src=wc:Incense_in_Vietnam.jpg"
  class="medium center box-shadow"
  allowfullscreen
></iframe>
```

##### Rendered

`image wc:Incense_in_Vietnam.jpg medium center box-shadow`

### Pexels example

This example uses an image hosted by Pexels.  Note that a full URL to the image must be used and image information must be explicitly defined.

####
`.tabs`

##### Rendered

`image https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg "Low Angle Photo of Eiffel Tower" medium center box-shadow`

##### Markdown

```markup
`image https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg "Low Angle Photo of Eiffel Tower" medium center box-shadow`
```

##### HTML

```markup
<iframe
  src="image?src=https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg&caption=Low+Angle+Photo+of+Eiffel+Tower"
  class="medium center box-shadow"
  allowfullscreen
></iframe>
```

