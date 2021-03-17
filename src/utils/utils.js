

class Vector2D {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    X() {
        return this.x;
    }
    Y() {
        return this.y;
    }
}

class DictionnaryPos {
    constructor() {
        this.dictionnary = [];
    }

    add(pos) {
        this.checkType(pos);

        this.dictionnary.push(pos);
    }
    removeAt(index) {
        
    }

    checkType(input) {
        if (typeof(input) != typeof(new Vector2D(0,0))) {
            throw("Expected a Vector2D to be added");
        }
    }
}
