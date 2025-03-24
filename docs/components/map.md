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

# Map

The `map` tag displays an interactive map centered on a specified location.  This map component uses the [Leaflet](https://leafletjs.com/).  Leaflet is a tool that lets websites show interactive maps. You can zoom in, zoom out, and move around the map, just like you would with Google Maps. It’s lightweight, fast, and works on phones, tablets, and computers. Many websites use Leaflet to help people explore locations, see points of interest, or display custom map data.

## Properties

**[caption](#basic-examples)** (_string_): Defines the text to use for a caption that is displayed below the map.

**[location](##basic-examples)** (_string_): The center coordinates and zoom level for the map.   

**[marker](##basic-examples)** (_boolean_):  If set, a marker will be displayed at the `location` coordinates

Notes:
- Boolean properties are specified using the property name only, for instance - `marker`.
- Non-boolean properties are specified using property=value syntax (i.e., `caption=Example`).  If the value includes spaces the value must be quoted (i.e., `caption="An Example Map"`).

## Zoom levels

Leaflet uses zoom levels to control how much of the map you can see at once. The scale typically ranges from 0 to 18 or higher, depending on the map provider:

- Zoom level 0 shows the entire world on one screen.
- Zoom level 10 shows a city and surrounding area.
- Zoom level 18 shows individual buildings and street details.

Higher zoom levels show more detail but cover a smaller area, while lower zoom levels show less detail but a larger area.

## Examples

### Basic examples

#### Simple map

Displays a map with a caption and marker.  The location consists of comma-separated values for the latitude and longitude of the map center and a zoom level.  In this example the latitude is `32.051` and longitude is `-81.104`, which centers the map on Savannah, Georgia.  The zoom level is set to `8`.

#####
`.tabs`

###### Markdown

```markup
`map 32.051,-81.104,8 "Savannah, GA" marker`
```

###### HTML

```html
<iframe
  src="https://ifc.juncture-digital.org/header?location=32.051,-81.104,8&title=Savannah,+GA"
  allowfullscreen
></iframe>
```

###### Rendered

`map 32.051,-81.104,8 "Savannah, GA" marker`

#### Zoom level comparison

#####
`.tabs`

###### Markdown

```markup
`map 32.051,-81.104,6 "Savannah, GA" marker`
`map 32.051,-81.104,10 "Savannah, GA" marker`
```

###### HTML

```html
<iframe
  src="https://ifc.juncture-digital.org/header?location=32.051,-81.104,6&title=Savannah,+GA"
  allowfullscreen
></iframe>
<iframe
  src="https://ifc.juncture-digital.org/header?location=32.051,-81.104,10&title=Savannah,+GA"
  allowfullscreen
></iframe>
```

###### Rendered

`map 32.051,-81.104,3 "Savannah, GA" marker`
`map 32.051,-81.104,6 "Savannah, GA" marker`
`map 32.051,-81.104,9 "Savannah, GA" marker`
`map 32.051,-81.104,12 "Savannah, GA" marker`