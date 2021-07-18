// variable declarations 
let incrementValue = 100 

let halfWindow = {
    x: 5,
    y: 5,
    width: 400,
    height: 750 
}

let numberOfRectangles = 26
let rectangles = []

function setup () {
    const canvas = createCanvas(800, 800)
    canvas.parent('sketch-01')
    
    for (let i = 0; i < numberOfRectangles/2; i++) {
        rectangles[i] = new LeftRectangle()
    }
    
    for (let i = numberOfRectangles/2; i < numberOfRectangles; i++) {
        rectangles[i] = new RightRectange()
    }

}

function draw () {

    // console.log(halfWindow)
    // drawing the half window which partitons the canvas
    background(245)
    rect (halfWindow.x, halfWindow.y, halfWindow.width, halfWindow.height)
    
    rectangles.forEach(rectangle => {
        rectangle.move()
        rectangle.display()
    })
  
}

class LeftRectangle {
    constructor() {
        this.x = random(50, 250)
        this.y = random(50, 500)
        this.width = random(10, 125)
        this.height = random(50, 80)
        this.speed = random(1, 2)
        this.direction = 1
        this.opacity = 0
    }

    display = function () {
        rect(this.x, this.y, this.width, this.height)
    }
    
    move = function () {
        if (mouseX > 0 && mouseX < 400 && mouseY > 0 && mouseY < 750) {

            if (this.x > halfWindow.width - this.width || this.x < 10) {
                this.direction *= -1
            } 

            this.x = this.x + this.speed*this.direction
        }
    }  

}

class RightRectange {
    constructor() {
        this.x = random(450, 650)
        this.y = random(50, 500)
        this.width = random(10, 125)
        this.height = random(50, 80)
        this.speed = random(1, 2)
        this.direction = -1
        this.opacity = 0
    }

    display = function () {
        rect(this.x, this.y, this.width, this.height)
    }
    
    move = function () {
        if (mouseX > 400 && mouseX < 800 && mouseY > 0 && mouseY < 750) {

            if (this.x < halfWindow.width + 10 || this.x > width - this.width) {
                this.direction *= -1
            } 
    
            this.x = this.x + this.speed * this.direction
        }
    }

}

