require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/TimeSlider"
], function(Map, MapView, FeatureLayer, TimeSlider) {

  var layer = new FeatureLayer({
    url: "https://services.arcgis.com/E5vyYQKPMX5X3R3H/arcgis/rest/services/Earthquake_Archive/FeatureServer",
    outFields: ["*"],
    timeInfo: {
      startField: "time",
      interval: {
        unit: "years",
        value: 5
      }
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-marker",
        outline: {
          color: "gray",
          width: 0.5
        },
        style: "circle",
        size: 6
      },
      visualVariables: [
        {
          type: "color",
          field: "mag",
          stops: [
            { value: 4, color: "#fee5d9" },
            { value: 5, color: "#fcbba1" },
            { value: 6, color: "#fc9272" },
            { value: 7, color: "#fb6a4a" },
            { value: 8, color: "#de2d26" },
            { value: 9.5, color: "#a50f15" }
          ]
        }
      ]
    }
  });

  var map = new Map({
    basemap: "gray-vector",
    layers: [layer]
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [0, 0],
    zoom: 2
  });

  view.when(function() {
    var timeSlider = new TimeSlider({
      container: "timeSlider",
      view: view,
      stops: {
        interval: {
          value: 5,
          unit: "years"
        }
      }
    });
    view.ui.add(timeSlider, "bottom");
    layer.when(function() {
      const fullTimeExtent = layer.timeInfo.fullTimeExtent;
      timeSlider.fullTimeExtent = fullTimeExtent;
      timeSlider.values = [fullTimeExtent.start, fullTimeExtent.end];
    });
  });
});
