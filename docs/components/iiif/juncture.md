<style>
  .markdown-section table { display: table; margin-top: 1em; }
  .markdown-section td { padding: 1em; }
  td:first-of-type { font-weight: 500; }
  td:last-of-type, th:last-of-type { }
  .markdown-section td, .markdown-section th { border: none; }
  th { text-align: left; }
  .markdown-section tr:nth-child(2n) { background-color: unset; }
  .markdown-section tr { border-top: none; border-bottom: 1px solid #ddd; }
</style>

# Image Viewer

The `image` tag creates an image viewer displaying the image found at the URL specified in the `src` tag.  Additional properties, such as label, may optionally be provided for display in the image metadata and caption bar.

## Examples

### Wikimedia Commons example

This example uses an image hosted by Wikimedia Commons.  When using Wikimedia Commons images the `wc:` prefix may be used instead of the full URL and image information (title, summary, rights, etc) is automatically retrieved from the Wikimedia Commons site and added to the viewer.  Click on the <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" height="1em" width="1em"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg> icon in the caption to see the image info.

####
`.tabs`

##### Rendered

`iiif-juncture wc:Incense_in_Vietnam.jpg medium center box-shadow static`

##### Markdown

```markup
`iiif-juncture wc:Incense_in_Vietnam.jpg medium center box-shadow static`
```

##### HTML

```markup
<iframe
  src="iiif-juncture?src=wc:Incense_in_Vietnam.jpg&static"
  class="medium center box-shadow"
  allowfullscreen
></iframe>
```

### GitHub example

####
`.tabs`

##### Rendered

`iiif-juncture gh:rsnyder/ifc/main/docs/components/monument-valley.jpg medium center box-shadow static`

##### Markdown

```markup
`iiif-juncture gh:rsnyder/ifc/main/docs/components/monument-valley.jpg medium center box-shadow static`
```

##### HTML

```markup
<iframe
  src="iiif-juncture?src=gh:rsnyder/ifc/main/docs/components/monument-valley.jpg&static"
  class="medium center box-shadow"
  allowfullscreen
></iframe>
```

### Annotated image example

####
`.tabs`

##### Rendered

`iiif-juncture wc:Monument_Valley,_Utah,_USA_(23611451292).jpg medium center box-shadow static`

##### Markdown

```markup
`iiif-juncture wc:Monument_Valley,_Utah,_USA_(23611451292).jpg medium center box-shadow static`
```

##### HTML

```markup
<iframe
  src="iiif-juncture?src=wc:Monument_Valley,_Utah,_USA_(23611451292).jpg&static"
  class="medium center box-shadow"
  allowfullscreen
></iframe>
```

## Zoomto

The image viewer supports interactivity via a `zoomto` action that is triggered from a text link.  The zoomto action causes the image to zoom in on a region of interest.  A 

## Properties

| Name  |  Type | Pos | Description |
|---|:--|:-:|:--|
| annos | | | |
| aspect | | | |
| caption | | | |
| cover | | | |
| format | | | |
| height | | | |
| language  | | | |
| manifest | | | |
| nocaption | | | |
| options | | | |
| quality | | | |
| region | | | |
| rotation | | | |
| seq | | | Image to display  when using a multi-image IIIF manifest. |
| size | | | |
| showannos | | | |
| src | | | |
| static | | | |
| width | | | |

Notes:
- Boolean properties are specified using the property name only, for instance, `center`.
- Non-boolean properties are specified using property=value syntax (i.e., `title=Example`).  If the value includes spaces the value must be quoted (i.e., `title="An Example"`).
- The URL value for the `img` property may be a full URL or a short form using recognized prefixes like `wc:` (for Wikimedia Commons hosted images) or `gh` (for GitHub hosted images).  If neither a full URL or prefixed value is used a relative URL is formed using the source Markdown file as the root.
- Only one of the `src` and `manifest` properties should be set.
- `Pos` refers to positional properties allowing some properties to be defined without using property names.  For instance `src` and `label` property names may be omitted when a src value defined in the first property and a label in the second.  This provides a convenient short-hand for commonly used properties.  The first example below uses this short-hand positional property syntax. 

### Rights Codes

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
