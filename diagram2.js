const seed2 = (sketch) => {
    
    let POVs = []

    let frontImages = [], backImages = [], leftImages = [], rightImages = []

    let povRadius = 25

    sketch.setup = () => {
        
        for (let i = 1; i <= 15; i++) {
            frontImages[i] = sketch.loadImage("images/front" + i + ".png")
            backImages[i] = sketch.loadImage("images/back" + i + ".png")
            leftImages[i] = sketch.loadImage("images/left" + i + ".png")
            rightImages[i] = sketch.loadImage("images/right" + i + ".png")
        }

        sketch.frameRate(5)

        sketch.createCanvas(sketch.displayWidth * 0.5, sketch.displayHeight * 0.5)

        POVs[0] = new POV(0.5*sketch.width, 0.05*sketch.height, povRadius, 'north', backImages)
        POVs[1] = new POV(0.95*sketch.width, 0.6*sketch.height, povRadius, 'east', rightImages)
        POVs[2] = new POV(0.4*sketch.width, 0.95*sketch.height, povRadius, 'south', frontImages)
        POVs[3] = new POV(0.05*sketch.width, 0.55*sketch.height, povRadius, 'west', leftImages)

        // sketch.noLoop()
    }
    
    sketch.draw = () => {
        sketch.background(255)
        
        POVs.forEach(POV => {
            POV.onClick()
            POV.display()
        })
 
    }

    class POV {
        constructor (posX, posY, radius, name, imageArray) {
            this.name = name
            this.x = posX
            this.y = posY
            this.radius = radius
            this.opacity = sketch.random(50, 85)
            this.pointA = []
            this.pointB = []
            this.currentImageIndex = 1
            this.imageArray = imageArray
            this.resizeFactor = 0.5
        }

        display = () => {
            // defining the point
            sketch.fill(125, 125, 125)
            sketch.circle(this.x, this.y, this.radius)
            
            // building the triangles
            
            switch (this.name) {
                case 'north':
                    this.pointA.push(this.x - sketch.width * 0.25, this.y + sketch.height * 0.75)
                    this.pointB.push(this.x + sketch.width * 0.3, this.y + sketch.height * 0.6 )
                    break
                
                case 'east':
                    this.pointA.push(this.x - sketch.width * 0.65, this.y - sketch.height * 0.35)
                    this.pointB.push(this.x - sketch.width * 0.75, this.y + sketch.height * 0.15)
                    break
                
                case 'south':
                    this.pointA.push(this.x + sketch.width * 0.15, this.y - sketch.height * 0.95)
                    this.pointB.push(this.x + sketch.width * 0.45, this.y - sketch.height * 0.4)
                    break
                
                case 'west':
                    this.pointA.push(this.x + sketch.width * 0.75, this.y - sketch.height * 0.35)
                    this.pointB.push(this.x + sketch.width * 0.80, this.y - sketch.height * 0.15)
                    break
            }

            sketch.noStroke()
            sketch.fill(225, 225, 225, this.opacity)
            sketch.triangle(this.x, this.y, this.pointA[0], this.pointA[1], this.pointB[0], this.pointB[1])
          
        }

        onClick = () => {
            let distance = sketch.dist(sketch.mouseX, sketch.mouseY, this.x, this.y)
            
            sketch.imageMode(sketch.CENTER)
            sketch.image(this.imageArray[this.currentImageIndex], sketch.width / 2, sketch.height / 2, 1920 * this.resizeFactor, 1080 * this.resizeFactor)

            if (distance < povRadius / 2) {
                
                if (this.currentImageIndex < 15) {
                    this.currentImageIndex++
                } else {
                    this.currentImageIndex = 1
                }

            }

        }
    }
}

const diagram2 = new p5(seed2, 'sketch-02')