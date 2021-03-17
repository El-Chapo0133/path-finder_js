console.log("Code me Daddy!");

const MAPID = "map";
const MAPSIZEX = 20;
const MAPSIZEY = 20;
const CASESIZEX = 30;
const CASESIZEY = 30;
const BASEHEROX = Math.floor(MAPSIZEX / 6);
const BASEHEROY = Math.floor(MAPSIZEY / 2);
const BASEFOODX = Math.floor(MAPSIZEX / 1.2);
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
    reset() {
        map.reset();
        drawer.resetCanvas();
        // draw hero and food
        drawer.drawRect(BASEHEROX * CASESIZEX, BASEHEROY * CASESIZEY, HEROCOLOR);
        drawer.drawRect(BASEFOODX * CASESIZEX, BASEFOODY * CASESIZEY, FOODCOLOR);
    }
}






let map = new Map();
let mapGenerator = new MapGenerator(map);
let canvas = mapGenerator.generateMap();
let drawer = new Drawer(canvas);
let engine = new Engine();

let controller = new Controller();



// FRONT
let mouseDown = false;
let casesChanged = [];
let started = false;
canvas.addEventListener('click', (e) => {
    if (!started) {
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
    }
});
canvas.addEventListener('mousedown', e => {
    if (!started) {
        mouseDown = true;
    }
});
canvas.addEventListener('mouseup', e => {
    mouseDown = false;
    casesChanged = [];
});
canvas.addEventListener('mousemove', e => {
    if (mouseDown) {
        let clickX = e.clientX;
        let clickY = e.clientY - H1HEIGHT;
        let posX = Math.floor(clickX / CASESIZEX);
        let posY = Math.floor(clickY / CASESIZEY);

        if (!contains(casesChanged, posX, posY)) {
            casesChanged.push({x: posX, y: posY});
    
            if (map.get(posX, posY) == HERO || map.get(posX, posY) == FOOD) {
                return;
            }
        
            map.toggleWall(posX, posY);
        
            let color = map.isWall(posX, posY) ? WALLCOLOR : EMPTYCOLOR;
            drawer.drawRect(posX * CASESIZEX, posY * CASESIZEY, color);
        }
    }
});


document.getElementById("button_start").addEventListener('click', () => {
    controller.start();
    started = true;
});
document.getElementById("button_reset").addEventListener('click', () => {
    controller.reset();
    started = false;
});



function contains(array, posX, posY) {
    for (let x = 0; x < array.length; x++) {
        if (array[x].x == posX && array[x].y == posY) {
            return true;
        }
    }
    return false;
}