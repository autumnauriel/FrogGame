

export class Player {

    constructor(canvas) {

        this.canvas = canvas
        this.ctx = canvas.getContext("2d");

        this.position = {x: 0, y: 0}
        this.width = 100
        this.height = 100

        // Handle Image
        this.imageLoaded = false;
        this.image = new Image();
        this.image.src = './derp.png';
        this.image.onload = () => {
            this.imageLoaded = true
            console.log(this.image.width)
        }

        // Handle Jump Dynamics
        this.isJumping = false
        this.jumpPosition = 0
        this.jumpHeight = 150

        // Manage Collisions
        this.safe = true

        // Manage Flies
        this.flies = 0
    }

    update = () => {

        this.safe = true

        if (this.isJumping) {
            this.jumpPosition += 0.05
            this.position.y = this.jumpHeight*Math.sin(this.jumpPosition) // trajectory 
            if (this.jumpPosition >= Math.PI){  
                this.isJumping = false; this.jumpPosition = 0;
            }
        }
    }

    draw = () => {
        let h = this.canvas.height
        let x = this.position.x
        let y = (h - this.height) - this.position.y
        if (this.imageLoaded) this.ctx.drawImage(this.image, x, y, this.width, this.height);
    }

    checkCollision = (fly) => {
  
        // Recognize Collision
        let collision = (
            (fly.position.x - (this.position.x + this.width) < 0) // distance between fly and right side is less than zero
            && (fly.position.y - (this.position.y + this.height) < 0) // distance between fly and top is less than zero
            && (this.position.y - fly.position.y < 0) // distance between fly and bottom is less than zero
        )

        if (collision) {
            fly.init()
            this.flies++
            this.width+= 1
            this.height+= 1
        }


        this.safe *= 1 -collision
 
        
    }

    jump = () => {

        this.isJumping = true;
        
    }
    
}