  // js goes here
let canvasWidth = 800;
let canvasHeight = 800;
let roadWidth = 100;

  function setup() {
        createCanvas(canvasWidth, canvasHeight);
        frameRate(30);
    }

let cars = [];  // list of cars
let numCars = 0;

function draw() {
    background(0, 0, 0);
    rect(10,10,10,10);
    vertRoad(canvasWidth/2 - roadWidth/2, 0);
    horRoad(0, canvasWidth/2 - roadWidth/2)
    

    if ((frameCount % 30  == 0) && numCars < 30) {
        cars.push(spawnCar());
        numCars += 1;
        console.log(cars.length);
        for (var i = 0; i < cars.length; i++) {
            console.log("car: " + i);
            console.log("color: " + cars[i].color);
            console.log("x: " + cars[i].x);
            console.log("y: " + cars[i].y);
            console.log("track: " + cars[i].trackNum);
        }
    } 
    
    // if (frameCount % 10 == 0) {
        for (var i = 0; i < cars.length; i++) {
            cars[i].move;
            cars[i].show;
            console.log("we moving");
        }
    // }
    // addCar();
    
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
        if (this.trackNum == 0) {
            this.y -= 10;
        } else if (this.trackNum == 1) {
            this.x += 10;
        } else if (this.trackNum == 2) {
            this.y += 10;
        } else if  (this.trackNum == 3){
            this.x -= 10;
        }
        
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
    
};