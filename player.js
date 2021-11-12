

export class Player {

    constructor(canvas) {

        this.canvas = canvas
        this.ctx = canvas.getContext("2d");

        this.position = {x: 0, y: 0}
        this.width = 100
        this.height = 100
        // this.jumping = false
        this.element = document.getElementById("character");


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
    }

    draw = () => {
        
        let h = this.canvas.height
        let x = this.position.x
        let y = (h - this.height) - this.position.y

        if (this.imageLoaded) this.ctx.drawImage(this.image, x, y, this.width, this.height);

        if (this.isJumping) {
            this.jumpPosition += 0.1
            this.position.y = this.jumpHeight*Math.sin(this.jumpPosition) // trajectory 
            if (this.jumpPosition >= Math.PI){  
                this.isJumping = false; this.jumpPosition = 0;
            }
        }
    }

    checkCollision = () => {

        let h = this.canvas.height
        let x = this.position.x
        let y = (h - this.height) - this.position.y

        this.ctx.beginPath();
        this.ctx.rect(x, y, this.width, this.height);
        
        let collision = false
        this.ctx.strokeStyle = (collision) ? 'red' : 'black'
        this.ctx.stroke()
    }

    jump = () => {

        this.isJumping = true;
        
    }
    
}