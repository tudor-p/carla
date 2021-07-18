const seed2 = (sketch) => {
    
    let POVs = []

    let frontImages = [], backImages = [], leftImages = [], rightImages = []

    let povRadius = 25

    let currentImageIndex = 1

    sketch.setup = () => {
        
        for (let i = 1; i < 20; i++) {
            frontImages[i] = sketch.loadImage("images/front" + i + ".png")
            // backImages[i] = sketch.loadImage("images/back" + i + ".png")
            // leftImages[i] = sketch.loadImage("images/left" + i + ".png")
            // rightImages[i] = sketch.loadImage("images/right" + i + ".png")
        }

        sketch.frameRate(5)

        sketch.createCanvas(1920, 1080)
        POVs[0] = new POV(0.5*sketch.width, 0.05*sketch.height, povRadius, 'north')
        POVs[1] = new POV(0.95*sketch.width, 0.6*sketch.height, povRadius, 'east')
        POVs[2] = new POV(0.4*sketch.width, 0.95*sketch.height, povRadius, 'south')
        POVs[3] = new POV(0.05*sketch.width, 0.55*sketch.height, povRadius, 'west')

        sketch.noLoop()
    }
    
    sketch.draw = () => {
        sketch.background(255)

        sketch.image(frontImages[currentImageIndex], 0, 0)
        
        POVs.forEach(POV => {
            POV.display()
        })
        if (currentImageIndex < 19) {
            currentImageIndex++ 
        } else if (currentImageIndex > 0) {
            currentImageIndex-- 
        }
    }

    class POV {
        constructor (posX, posY, radius, name) {
            this.name = name
            this.x = posX
            this.y = posY
            this.radius = radius
            this.opacity = sketch.random(50, 85)
        }

        display = () => {
            // defining the point
            sketch.fill(125, 125, 125)
            sketch.circle(this.x, this.y, this.radius)
            
            // building the triangles
            
            sketch.noStroke()
            sketch.fill(225, 225, 225, this.opacity)
            switch (this.name) {
                case 'north':
                    sketch.triangle(
                        this.x, 
                        this.y, 
                        this.x - sketch.width * 0.25, 
                        this.y + sketch.height * 0.75, 
                        this.x + sketch.width * 0.3, 
                        this.y + sketch.height * 0.6 
                    )
                    break
                
                case 'east': 
                    sketch.triangle(
                        this.x, 
                        this.y, 
                        this.x - sketch.width * 0.65, 
                        this.y - sketch.height * 0.35, 
                        this.x - sketch.width * 0.75, 
                        this.y + sketch.height * 0.15
                    )
                    break
                
                case 'south':
                    sketch.triangle(
                        this.x, 
                        this.y, 
                        this.x + sketch.width * 0.15, 
                        this.y - sketch.height * 0.95, 
                        this.x + sketch.width * 0.45, 
                        this.y - sketch.height * 0.4
                    )
                    break
                
                case 'west':
                    sketch.triangle(
                        this.x,
                        this.y, 
                        this.x + sketch.width * 0.75, 
                        this.y - sketch.height * 0.35, 
                        this.x + sketch.width * 0.80,  
                        this.y - sketch.height * 0.15
                    )
                    break
            }
          
        }

        onClick = () => {
            console.log(this.x, this.y)
        }
    }
}

const diagram2 = new p5(seed2, 'sketch-02')