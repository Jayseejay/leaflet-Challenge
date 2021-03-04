console.log("Step-1");

let firstMap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 480,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  }
);


let map = L.map("mapid", {
  center: [
    40.7, -94.5
  ],
  zoom: 3
});


firstMap.addTo(map);


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

  
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.geometry.coordinates[2]),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  
  function getColor(depth) {
    switch (true) {
    case depth > 90:
      return "#ea2c2c";
    case depth > 70:
      return "#ea822c";
    case depth > 50:
      return "#ee9c00";
    case depth > 30:
      return "#eecc00";
    case depth > 10:
      return "#d4ee00";
    default:
      return "#98ee00";
    }
  }

  
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }

    return magnitude * 4;
  }

  
  L.geoJson(data, {
    
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    
    style: styleInfo,
    
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        "Magnitude: "
          + feature.properties.mag
          + "<br>Depth: "
          + feature.geometry.coordinates[2]
          + "<br>Location: "
          + feature.properties.place
      );
    }
  }).addTo(map);

  
  var legend = L.control({
    position: "bottomright"
  });

  
  

  
  legend.addTo(map);
});
