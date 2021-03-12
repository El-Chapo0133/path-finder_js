

class Drawer {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
    }
    drawRect(x,y,color) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, CASESIZEX, CASESIZEY);
    }
}