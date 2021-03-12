console.log("Code me Daddy!");

const MAPID = "map";
const MAPSIZEX = 10;
const MAPSIZEY = 10;
const CASESIZEX = 20;
const CASESIZEY = 20;
const BASEHEROX = Math.floor(MAPSIZEX / 4);
const BASEHEROY = Math.floor(MAPSIZEY / 2);
const BASEFOODX = Math.floor(MAPSIZEX / 1.5);
const BASEFOODY = Math.floor(MAPSIZEY / 2);
const H1HEIGHT = 38;
const HERO = 1, FOOD = 2, WALL = 3, EMPTY = 0;
const HEROCOLOR = "blue", FOODCOLOR = "yellow", WALLCOLOR = "black", EMPTYCOLOR = "white";


class Controller {
    constructor() {

        this.init();
    }
    init() {
        // draw hero and food
        drawer.drawRect(BASEHEROX * CASESIZEX, BASEHEROY * CASESIZEY, HEROCOLOR);
        drawer.drawRect(BASEFOODX * CASESIZEX, BASEFOODY * CASESIZEY, FOODCOLOR);
    }
    start() {
        engine.calculatePath(map.getMap());
    }
    stop() {

    }
    reset() {

    }
}






let map = new Map();
let mapGenerator = new MapGenerator(map);
let canvas = mapGenerator.generateMap();
let drawer = new Drawer(canvas);
let engine = new Engine();

let controller = new Controller();




canvas.addEventListener('click', e => {
    let clickX = e.clientX;
    let clickY = e.clientY - H1HEIGHT;
    let posX = Math.floor(clickX / CASESIZEX);
    let posY = Math.floor(clickY / CASESIZEY);

    if (map.get(posX, posY) == HERO || map.get(posX, posY) == FOOD) {
        return;
    }

    map.toggleWall(posX, posY);

    let color = map.isWall(posX, posY) ? WALLCOLOR : EMPTYCOLOR;
    drawer.drawRect(posX * CASESIZEX, posY * CASESIZEY, color);
});


document.getElementById("button_start").addEventListener('click', () => {
    controller.start();
});