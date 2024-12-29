# Image Viewer

## Options

### Rights

The `rights` options asserts the reuse rights for an image and any attribution (or other) statements that must be displayed when the image is used.  The `rights` value is a string that identifies a license or rights statement that applies to the image. The value must be drawn from the set of [Creative Commons](https://creativecommons.org/licenses/) license URIs or [RightsStatements.org](https://rightsstatements.org/page/1.0/) rights statement URIs.  The license or rights code may also be provided as a value to the `rights` option.  It will be converted to the corresponding URL.

#### Creative Commons Licenses
`.details`

| Code | Definition | URL |
| ---- | ---------- | --- |
| **CC0** | Public Domain Dedication | [http://creativecommons.org/publicdomain/zero/1.0/](http://creativecommons.org/publicdomain/zero/1.0/) |
| **CC-BY** | Attribution | [http://creativecommons.org/licenses/by/4.0/](http://creativecommons.org/licenses/by/4.0/) |
| **CC-BY-SA** | Attribution-ShareAlike | [http://creativecommons.org/licenses/by-sa/4.0/](http://creativecommons.org/licenses/by-sa/4.0/) |
| **CC-BY-ND** | Attribution-NoDerivs | [http://creativecommons.org/licenses/by-nd/4.0/](http://creativecommons.org/licenses/by-nd/4.0/) |
| **CC-BY-NC** | Attribution-NonCommercial | [http://creativecommons.org/licenses/by-nc/4.0/](http://creativecommons.org/licenses/by-nc/4.0/) |
| **CC-BY-NC-SA** | Attribution-NonCommercial | [http://creativecommons.org/licenses/by-nc-sa/4.0/](http://creativecommons.org/licenses/by-nc-sa/4.0/) |
| **CC-BY-NC-ND** | Attribution-NonCommercial-NoDerivs | [http://creativecommons.org/licenses/by-nc-nd/4.0/](http://creativecommons.org/licenses/by-nc-nd/4.0/) |

#### Rights Statements
`.details`

| Code | Definition | URL |
| ---- | ---------- | --- |
| **InC** | In Copyright | [http://rightsstatements.org/vocab/InC/1.0/](http://rightsstatements.org/vocab/InC/1.0/) |
| **InC-OW-EU** | In Copyright - EU Orphan Work | [http://rightsstatements.org/vocab/InC-OW-EU/1.0/](http://rightsstatements.org/vocab/InC-OW-EU/1.0/) |
| **InC-EDU** | In Copyright - Educational Use Permitted | [http://rightsstatements.org/vocab/InC-EDU/1.0/)](http://rightsstatements.org/vocab/InC-EDU/1.0/) |
| **InC-NC** | In Copyright - Non-Commercial Use Permitted | [http://rightsstatements.org/vocab/InC-NC/1.0/](http://rightsstatements.org/vocab/InC-NC/1.0/) |
| **InC-RUU** | In Copyright - Rights-Holder(s) Unlocatable or Unidentifiable | [http://rightsstatements.org/vocab/InC-RUU/1.0/](http://rightsstatements.org/vocab/InC-RUU/1.0/) |
| **NoC-CR** | No Copyright - Contractual Restrictions | [http://rightsstatements.org/vocab/NoC-CR/1.0/](http://rightsstatements.org/vocab/NoC-CR/1.0/) |
| **NoC-NC** | No Copyright - Non-Commercial Use Only | [http://rightsstatements.org/vocab/NoC-NC/1.0/](http://rightsstatements.org/vocab/NoC-NC/1.0/) |
| **NoC-OKLR** | No Copyright - Other Known Legal Restrictions | [http://rightsstatements.org/vocab/NoC-OKLR/1.0/](http://rightsstatements.org/vocab/NoC-OKLR/1.0/) |
| **NoC-US** | No Copyright - United States | [http://rightsstatements.org/vocab/NoC-US/1.0/](http://rightsstatements.org/vocab/NoC-US/1.0/) |
| **CNE** | Copyright Not Evaluated | [http://rightsstatements.org/vocab/CNE/1.0/](http://rightsstatements.org/vocab/CNE/1.0/) |
| **UND** | Copyright Undertermined | [http://rightsstatements.org/vocab/UND/1.0/](http://rightsstatements.org/vocab/UND/1.0/) |
| **NKC** | No Known Copyright | [http://rightsstatements.org/vocab/NKC/1.0/](http://rightsstatements.org/vocab/NKC/1.0/) |

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

##### Markdown

```markup
`image https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg "Low Angle Photo of Eiffel Tower" rights=CC-BY medium center box-shadow`
```

##### HTML

```markup
<iframe
  src="image?src=https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg&label=Low+Angle+Photo+of+Eiffel+Tower"
  class="medium center box-shadow"
  allowfullscreen
></iframe>
```

##### Rendered

`image https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg "Low Angle Photo of Eiffel Tower" rights=CC-BY required="Image provided by https://www.pexels.com/@suissounet/" medium center box-shadow`

### Manifest example

This example uses an IIIF manifest rather than an image URL.  The image URL is extracted from the manifest using the page number as an index when the manifest contains multiple images.  When using an IIIF manifest as the image source any available image metadata (label, description, license, etc) is automatically extracted and added to the image viewer.

####
`.tabs`

##### Markdown

```markup
`image manifest=https://iiif.bodleian.ox.ac.uk/iiif/manifest/e32a277e-91e2-4a6d-8ba6-cc4bad230410.json page=10 medium center box-shadow`
```

##### HTML

```markup
<iframe
  src="image?manifest=https://iiif.bodleian.ox.ac.uk/iiif/manifest/e32a277e-91e2-4a6d-8ba6-cc4bad230410.json&page=10"
  class="medium center box-shadow"
  allowfullscreen
></iframe>
```

##### Rendered

`image manifest=https://iiif.bodleian.ox.ac.uk/iiif/manifest/e32a277e-91e2-4a6d-8ba6-cc4bad230410.json page=10 medium center box-shadow`

### Manifest example #2

####
`.tabs`

##### Markdown

```markup
`image manifest=https://iiif.harvardartmuseums.org/manifests/object/299843 medium center box-shadow`
```

##### HTML

```markup
<iframe
  src="image?manifest=https://iiif.harvardartmuseums.org/manifests/object/299843"
  class="medium center box-shadow"
  allowfullscreen
></iframe>
```

##### Rendered

`image manifest=https://iiif.harvardartmuseums.org/manifests/object/299843 medium center box-shadow`


### Github hosted image with EXIF data

####
`.tabs`

##### Markdown

```markup
`image https://raw.githubusercontent.com/rsnyder/media/main/italy/amalfi-coast/Amalfi__1.jpg medium center box-shadow`
```

##### HTML

```markup
<iframe
  src="image?src=https://raw.githubusercontent.com/rsnyder/media/main/italy/amalfi-coast/Amalfi__1.jpg"
  class="medium center box-shadow"
  allowfullscreen
></iframe>
```

##### Rendered

`image https://raw.githubusercontent.com/rsnyder/media/main/italy/amalfi-coast/Amalfi__1.jpg medium center box-shadow`

### IIIF Manifest generated from Github hosted image

####
`.tabs`

##### Markdown

```markup
`image manifest=https://iiif.mdpress.io/gh:rsnyder/media/main/italy/amalfi-coast/Amalfi__1.jpg/manifest.json medium center box-shadow`
```

##### HTML

```markup
<iframe
  src="image?manifest=https://iiif.mdpress.io/gh:rsnyder/media/main/italy/amalfi-coast/Amalfi__1.jpg/manifest.json"
  class="medium center box-shadow"
  allowfullscreen
></iframe>
```

##### Rendered

`image manifest=https://iiif.mdpress.io/gh:rsnyder/media/main/italy/amalfi-coast/Amalfi__1.jpg/manifest.json medium center box-shadow`
