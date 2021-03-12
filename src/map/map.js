


class Map {
    constructor() {

        this.init_map();
    }

    init_map() {
        this.map = [];
        for (let indexX = 0; indexX < MAPSIZEX; indexX++) {
            this.map[indexX] = [];
            for (let indexY = 0; indexY < MAPSIZEY; indexY++) {
                this.map[indexX][indexY] = 0;
            }
        }
        this.map[BASEHEROX][BASEHEROY] = HERO;
        this.map[BASEFOODX][BASEFOODY] = FOOD;
    }

    get(x,y) {
        this.checkPos(x,y);
        return this.map[x][y];
    }
    getMap() {
        return this.map;
    }

    toggleWall(x, y) {
        this.checkPos(x,y);
        this.map[x][y] = this.map[x][y] == WALL ? EMPTY : WALL;
    }

    isWall(x, y) {
        this.checkPos(x,y);
        return this.map[x][y] == WALL;
    }

    checkPos(x,y) {
        if (x < 0 || x > MAPSIZEX || y < 0 || y > MAPSIZEY) {
            throw new Error("X or Y are not in the array", x, y);
        }
    }
}