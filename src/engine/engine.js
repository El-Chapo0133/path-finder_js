

class Engine {
    constructor() {
        this.coveredCase = 4;
    }

    calculatePath(map) {
        // // this.generateCoveredPosMap(map);
        // this.vectorsWithFood(this.findFood(map));
        this.findFood(map);
        
        this.found = false;
    }

    findFood(map) {
        let heroPos = getHeroPos(map);
        let baseNeighBors = [heroPos];


        let dicoNeightbors = baseNeighBors;
        let secondNeightbors = baseNeighBors;
        let newNeightbors = [];
    
        let findFoodInterval = setInterval(() => {

            secondNeightbors.forEach(secondNeightbor => { 
                let newNeightbor = this.getNeightbors(secondNeightbor);
                
                newNeightbor.forEach(neightbor => {
                    if (!dicoIncludes(dicoNeightbors, neightbor) && map[neightbor.X()][neightbor.Y()] != WALL) {
                        newNeightbors.push(neightbor);
                        dicoNeightbors.push(neightbor);

                        if (map[neightbor.X()][neightbor.Y()] == FOOD) {
                            clearInterval(findFoodInterval);
                            console.log("Food found");
                            
                            return;
                        }
                        
                        if (map[neightbor.X()][neightbor.Y()] != FOOD && map[neightbor.X()][neightbor.Y()] != HERO) {
                            drawer.drawRect(neightbor.X() * CASESIZEX, neightbor.Y() * CASESIZEY, 'red');
                        }
                    }
                })
            });

            if (newNeightbors.length == 0) {
                return -1;
            }

            dicoNeightbors = appendsTwoArray(secondNeightbors, newNeightbors);
            secondNeightbors = newNeightbors;
            newNeightbors = [];


        }, 100);
    }

    recursiveFindFood(map, path) {
        let neightbors = this.getNeightbors(path[path.length - 1]);
        for (let x = 0; x < neightbors.length; x++) {
            if (!dicoIncludes(this.dicoNeightbors, neightbors[x]) && map[neightbors[x].X()][neightbors[x].Y()] != WALL) {
                this.dicoNeightbors.push(neightbors[x]);
                if (map[neightbors[x].X()][neightbors[x].Y()] == FOOD) {
                    this.found = true;
                    return path;
                }
                let newPath = path;
                newPath.push(neightbors[x]);
                if (!this.found) {
                    return this.recursiveFindFood(map, newPath);
                }
            }
        }
    }

    getNeightbors(vector) {
        let neightbors = [];
        if (vector.X() > 0) { // top
            neightbors.push(new Vector2D(vector.X()-1, vector.Y()));
        }
        if (vector.Y() < MAPSIZEY - 1) { // right
            neightbors.push(new Vector2D(vector.X(), vector.Y()+1));
        }
        if (vector.X() < MAPSIZEX - 1) { // bottom
            neightbors.push(new Vector2D(vector.X()+1, vector.Y()));
        }
        if (vector.Y() > 0) { // left
            neightbors.push(new Vector2D(vector.X(), vector.Y()-1));
        }
        return neightbors;
    }
}




function appendsTwoArray(arr1, arr2) {
    return arr1.concat(arr2);
}
function dicoIncludes(dico, input) {
    for (let x = 0; x < dico.length; x++) {
        if (dico[x].X() == input.X() && dico[x].Y() == input.Y()) {
            return true;
        }
    }
    return false;
}
function getHeroPos(map, hero) {
    for (let indexX = 0; indexX < MAPSIZEY; indexX++) {
        for (let indexY = 0; indexY < MAPSIZEX; indexY++) {
            if (map[indexX][indexY] == HERO) {
                return new Vector2D(indexX, indexY);
            }
        }
    }
}


//for (let indexX = 0; indexX < MAPSIZEY; indexX++) {
//    for (let indexY = 0; indexY < MAPSIZEX; indexY++) {

//    }
//}