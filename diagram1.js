// seed 1 idea coming from https://github.com/processing/p5.js/wiki/Global-and-instance-mode

const seed1 = (sketch) => {
    
    // 
    let halfWindow = {
        x: 5,
        y: 5,
        width: 200,
        height: 385 
    }

    
    let rectangles = []

    let numberOfRectangles = 18
    
    sketch.setup = () => {
        sketch.createCanvas(400, 400)
        
        for (let i = 0; i < numberOfRectangles/2; i++) {
            rectangles[i] = new LeftRectangle()
        }
        
        for (let i = numberOfRectangles/2; i < numberOfRectangles; i++) {
            rectangles[i] = new RightRectange()
        }
    
    }
    
    sketch.draw = () => {
    
        // white background 
        sketch.background(245)

        // drawing the half window which partitons the canvas
        sketch.rect(halfWindow.x, halfWindow.y, halfWindow.width, halfWindow.height)
        
        for (let i = 0; i < rectangles.length; i++) {
            rectangles[i].display()
            rectangles[i].move()
        }
      
    }
    
    class LeftRectangle {
        constructor() {
            this.x = sketch.random(80, halfWindow.width - 80)
            this.y = sketch.random(50, halfWindow.height - 60)
            this.width = sketch.random(10, 75)
            this.height = sketch.random(30, 60)
            this.speed = sketch.random(1, 2)
            this.direction = 1
            this.r = sketch.random(0,255) 
            this.g = sketch.random(0,255) 
            this.b = sketch.random(0,255) 
        }
    
        display = function () {
            sketch.fill(this.r, this.b, this.g)
            sketch.rect(this.x, this.y, this.width, this.height)
        }
        
        move = function () {
            if (sketch.mouseX > 0 && 
                sketch.mouseX < halfWindow.width && 
                sketch.mouseY > 0 && 
                sketch.mouseY < sketch.height) {
    
                if (this.x > halfWindow.width - this.width || this.x < 10) {
                    this.direction *= -1
                }
    
                this.x = this.x + this.speed*this.direction
            }
        }  
    
    }
    
    class RightRectange {
        constructor() {
            this.x = sketch.random(halfWindow.width + 80, sketch.width - 80)
            this.y = sketch.random(50, halfWindow.height - 50)
            this.width = sketch.random(10, 75)
            this.height = sketch.random(30, 60)
            this.speed = sketch.random(1, 2)
            this.direction = -1
            this.opacity = 0
        }
    
        display = () => {
            sketch.rect(this.x, this.y, this.width, this.height)
        }
        
        move = () => {
            if (sketch.mouseX > halfWindow.width && 
                sketch.mouseX < sketch.width && 
                sketch.mouseY > 0 && 
                sketch.mouseY < sketch.height) {
    
                if (this.x < halfWindow.width + 10 || this.x > sketch.width - this.width) {
                    this.direction *= -1
                } 
        
                this.x = this.x + this.speed * this.direction
            }
        }
    
    }
    
}    

const diagram1 = new p5(seed1, 'sketch-01')