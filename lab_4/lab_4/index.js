// JavaScript File
"use strict";
(function () {
    var map; //mapbox map object
    //link to my personal dark style
    var myStyle = "mapbox://styles/chianson/cje0ccup17iwo2tk4ujow1vpz";
    window.onload = function() {
        //Token to allow a request to the mapbox api
        mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpYW5zb24iLCJhIjoiY2pkeXVkM3pwMnZ0bDMydDM5ZTdvMnFrMSJ9.tkK3NgjXaLtmcilvC4RH3Q';
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/basic-v9',
            //style: myStyle,
            center: [-122.3321, 47.5],
            zoom: 9
        });
        
        //Initializes the radio buttons with onclicks to switch layers
        var layerList = document.getElementById("menu");
        var inputs = layerList.getElementsByTagName("input");
        for (var i=0; i < inputs.length; i++){
            inputs[i].onclick = switchLayer;
        }
        
        //Call loadlayer to load map layers
        loadLayer();
    };
    
    /**
     * Takes the current map layer as a parameter and switches the map
     * layer to the desired style.
     * @param layer is the current layer of the mapbox map object
     */
    function switchLayer(layer){
        var layerId = layer.target.id;
        if(layerId == "dark"){ //sets the style back to my dark stlye
            map.setStyle(myStyle); 
        } else { //sets the stlye to the chosen radio button other than dark
            map.setStyle("mapbox://styles/mapbox/" + layerId + "-v9");
            loadLayer();
        }
    }
    
    /**
     * Loads the current map style and adds the homeless data as a layer.
     */
    function loadLayer(){
        map.on("load", function() { //ensures map loads before adding layers
            map.addSource("homeless_data3", { //add homeless data source
              "type": "geojson", //reads it in as a geojson file
              "data": "./homeless_data3.geojson"
            });
            
            //Add the homeless data as a symbol layer
            map.addLayer({
                "id": "homelessSymbol",
                "type": 'symbol',
                "source": 'homeless_data3',
                "maxzoom": 15,
                "layout": {
                    //"icon-image": "{icon}-15",
                    "text-field": "{name}",
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-offset": [0, 0.6],
                    "text-anchor": "top"
                }
            });
        });
    }
})();