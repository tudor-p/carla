// seed 1 idea coming from https://github.com/processing/p5.js/wiki/Global-and-instance-mode

const seed1 = (sketch) => {
    
    let halfWindow = {
        x: 5,
        y: 5,
        width: 400,
        height: 750 
    }
    
    let numberOfRectangles = 26
    let rectangles = []
    
    sketch.setup = () => {
        sketch.createCanvas(800, 800)
        
        for (let i = 0; i < numberOfRectangles/2; i++) {
            rectangles[i] = new LeftRectangle()
        }
        
        for (let i = numberOfRectangles/2; i < numberOfRectangles; i++) {
            rectangles[i] = new RightRectange()
        }
    
    }
    
    sketch.draw = () => {
    
        // console.log(halfWindow)
        // drawing the half window which partitons the canvas
        sketch.background(245)
        sketch.rect (halfWindow.x, halfWindow.y, halfWindow.width, halfWindow.height)
        
        rectangles.forEach(rectangle => {
            rectangle.move()
            rectangle.display()
        })
      
    }
    
    class LeftRectangle {
        constructor() {
            this.x = sketch.random(50, 250)
            this.y = sketch.random(50, 500)
            this.width = sketch.random(10, 125)
            this.height = sketch.random(50, 80)
            this.speed = sketch.random(1, 2)
            this.direction = 1
            this.opacity = 0
        }
    
        display = function () {
            sketch.rect(this.x, this.y, this.width, this.height)
        }
        
        move = function () {
            if (sketch.mouseX > 0 && sketch.mouseX < 400 && sketch.mouseY > 0 && sketch.mouseY < 750) {
    
                if (this.x > halfWindow.width - this.width || this.x < 10) {
                    this.direction *= -1
                } 
    
                this.x = this.x + this.speed*this.direction
            }
        }  
    
    }
    
    class RightRectange {
        constructor() {
            this.x = sketch.random(450, 650)
            this.y = sketch.random(50, 500)
            this.width = sketch.random(10, 125)
            this.height = sketch.random(50, 80)
            this.speed = sketch.random(1, 2)
            this.direction = -1
            this.opacity = 0
        }
    
        display = () => {
            sketch.rect(this.x, this.y, this.width, this.height)
        }
        
        move = () => {
            if (sketch.mouseX > 400 && sketch.mouseX < 800 && sketch.mouseY > 0 && sketch.mouseY < 750) {
    
                if (this.x < halfWindow.width + 10 || this.x > sketch.width - this.width) {
                    this.direction *= -1
                } 
        
                this.x = this.x + this.speed * this.direction
            }
        }
    
    }
    
}    

const diagram1 = new p5(seed1, 'sketch-01')