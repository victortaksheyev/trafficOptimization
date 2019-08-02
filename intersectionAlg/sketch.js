  // js goes here
let canvasWidth = 800;
let canvasHeight = 800;
let roadWidth = 100;
let maxCars = 20;

let cars = [];  // list of cars
let numCars = 0;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    frameRate(30);
}

function draw() {
    background(0, 0, 0);            // map bg
    
    let trafficLights = [];
    
    let tLight0 = new trafficLight(500, 500, "green"); trafficLights.push(tLight0);
    let tLight1 = new trafficLight(500, 270, "red"); trafficLights.push(tLight1);
    let tLight2 = new trafficLight(270, 270, "green"); trafficLights.push(tLight2);
    let tLight3 = new trafficLight(270, 500, "red"); trafficLights.push(tLight3);
    
    trafficLights[0].show();     // bottom
    trafficLights[1].show();     // right
    trafficLights[2].show();     // top    
    trafficLights[3].show();     // left

    if (frameCount % 90 == 0) {     // if 3 seconds passed
        for (var i = 0; i < 4; i++) {
            trafficLights[i].changeColor();
            trafficLights[i].show();
        }
        console.log("we in here");
    }
    
    // rect(10,10,10,10);
    vertRoad(canvasWidth/2 - roadWidth/2, 0);
    horRoad(0, canvasWidth/2 - roadWidth/2)
    
    if (numCars < maxCars) {
        cars.push(spawnCar());
        numCars +=1 ;
    }
    
    // if (frameCount % 10 == 0) {
        for (var i = 0; i < cars.length; i++) {
            cars[i].move();
            cars[i].show();
        }

        for (var i = 0; i < cars.length; i++) {
            if (cars[i].shouldDelete()) {
                cars.splice(i, 1);  // removes that car from the array?
                numCars -= 1;
            }
        }

    
}

function vertRoad(x, y) {
    noFill();
    stroke('#ffffff');
    strokeWeight(2);
    rect(x, y, 100, canvasHeight);
    
    // adding the line in the middle of the road
    stroke('yellow');
    strokeWeight(2);
    line(canvasWidth/2, 0, canvasWidth/2, canvasHeight);
}

function horRoad(x, y) {
    noFill();
    stroke('#ffffff');
    strokeWeight(2);
    rect(x, y, canvasWidth, 100);

    // adding the line in the middle of the road
    stroke('yellow');
    strokeWeight(2);
    line(0, canvasHeight/2, canvasWidth, canvasHeight/2);
}

// dots represent cars
// dots follow rules of the road
function spawnCar(){
    // the car will spawn at a random of the four corners
    let spawnLocation = floor(random(4));
    let spawnX;
    let spawnY;
    switch(spawnLocation) {
        case 0: // bottom
            spawnX = canvasWidth / 2 + 21;
            spawnY = canvasHeight - 10;
            break;
        case 1: // right
            spawnX = canvasWidth - 10;
            spawnY = canvasHeight/2 - 21;
            break;
        case 2: // top
            spawnX = canvasWidth / 2 - 26;
            spawnY = 10;
            break;
        case 3: // left
            spawnX = 10; 
            spawnY = canvasHeight/2 + 20;
            break;
        default:
            console.log("error");   // this will not happen
    }

    let colors = ["#2ecc71", "#3498db", "#9b59b6", "#1abc9c", "#e67e22", "#ecf0f1"];

    // create a car object
    let car = new Car(random(colors), spawnX, spawnY, spawnLocation);

    // console.log(spawnLocation);
    return car; // return car
}

class Car {
    constructor(color, x, y, trackNum) {
        this.color = color;
        this.x = x; 
        this.y = y;
        this.trackNum = trackNum;
        fill(this.color);
        rect(x, y, 10, 10);
    }
    
    // param: track number (0, 1, 2, 3)
    move() {
        if (this.x > canvasWidth || this.x < 0) {
            // do nothing
            return;
        }
        if (this.y > canvasHeight || this.y < 0) {
            // do nothing
            return;
        }
        
        if (this.trackNum == 0) {
            this.y -= 10;
        } else if (this.trackNum == 1) {
            this.x -= 10;
        } else if (this.trackNum == 2) {
            this.y += 10;
        } else if  (this.trackNum == 3){
            this.x += 10;
        }

        // if ()


        // making cars stop at traffic lights
    }

    show () {
        fill(this.color);
        rect(this.x, this.y, 10, 10);
    }

    setTrackNum(trackNum) {
        this.trackNum = trackNum;
    }

    get xPos() {
        return this.x;
    }

    get yPos() {
        return this.y;
    }

    shouldDelete() {
        if (this.x > canvasWidth || this.x < 0) {
            // do nothing
            // console.log("should del");
            return true;
        }
        if (this.y > canvasHeight || this.y < 0) {
            // do nothing
            // console.log("should del");
            return true;
        }
        // console.log("DON'T del");
        return false;
    }
};

class trafficLight {
    constructor(x, y, color) {
        this.currentLight = color;
        this.xPos = x;
        this.yPos = y;
    }

    show() {
        fill(this.currentLight);
        stroke("white");
        rect(this.xPos, this.yPos, 30, 30);
    }

    changeColor() {
        if (this.currentLight == "red") this.currentLight = "green";
        else this.currentLight = "red";
    }
}



// each car will have a light to look at
// if that light is red, they stop
// if that light is green, they go


