

class Drawer {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
    }
    drawRect(x,y,color) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, CASESIZEX, CASESIZEY);
    }
    resetCanvas() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, MAPSIZEX * CASESIZEX, MAPSIZEY * CASESIZEY);
    }
}