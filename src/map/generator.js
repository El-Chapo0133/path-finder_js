

class MapGenerator {
    constructor(map) {
        this.map = map;
    }

    generateMap() {
        let map = document.getElementById(MAPID);
        map.style.width = (CASESIZEX * MAPSIZEX) + "px";
        map.style.height = (CASESIZEY * MAPSIZEY) + "px";
        map.style.margin = "0";
        map.style.padding = "0";

        let main_canvas = document.createElement("canvas");
        main_canvas.width = (CASESIZEX * MAPSIZEX);
        main_canvas.height = (CASESIZEY * MAPSIZEY);

        map.appendChild(main_canvas);

        return main_canvas;
    }

}