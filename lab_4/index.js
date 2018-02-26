// JavaScript File
"use strict";
(function () {
    var map; //mapbox map object
    
    //links to my personal styles stored in a js map
    var mapStyles = {
        basic: "mapbox://styles/chianson/cje3oo59w0i5t2rmkmqaw130i",
        streets: "mapbox://styles/chianson/cje3qgy7g6m0k2so49v5ctifi",
        bright: "mapbox://styles/chianson/cje3q69c31ka82rp4fwahl40t",
        nav: "mapbox://styles/chianson/cje3qrdi70x032rmr7mkfpvyg",
        dark: "mapbox://styles/chianson/cje0ccup17iwo2tk4ujow1vpz"
    };
    
    window.onload = function() {
        //Token to allow a request to the mapbox api
        mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpYW5zb24iLCJhIjoiY2pkeXVkM3pwMnZ0bDMydDM5ZTdvMnFrMSJ9.tkK3NgjXaLtmcilvC4RH3Q';
        map = new mapboxgl.Map({
            container: 'map',
            style: mapStyles.basic,
            center: [-122.3321, 47.5], //centered on King County
            zoom: 9
        });
        
        //Initializes the radio buttons with onclicks to switch layers
        var layerList = document.getElementById("menu");
        var inputs = layerList.getElementsByTagName("input");
        for (var i=0; i < inputs.length; i++){
            inputs[i].onclick = switchLayer;
        }
    };
    
    /**
     * Takes the current map layer as a parameter and switches the map
     * layer to the desired style.
     * @param layer is the current layer of the mapbox map object
     */
    function switchLayer(layer){
        var layerId = layer.target.id;
        map.setStyle(mapStyles[layerId]);
    }
})();