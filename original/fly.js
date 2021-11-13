export class Fly{
    constructor(canvas){
        
        this.canvas = canvas
        this.ctx = canvas.getContext("2d");

        // Core Properties
        this.relPos = {x: null, y:null}
        this.position = {x: null, y:null}
        this.width = 10
        this.height = 10
        this.maxHeight = 200 - this.height

        // Handle Image
        this.imageLoaded = false;
        this.image = new Image();
        this.image.src = './derp.png';
        // this.image.onload = () => {
        //     this.imageLoaded = true
        // }

        this.init()
    }

    init = () => {
        this.relPos.x = 1 + 10*Math.random()
        this.relPos.y =  Math.random()

    }

    update = () => {

        this.relPos.x -= 0.01
        if (this.relPos.x < -this.width/this.canvas.width) this.init()

    }

    draw = () => {

        let h = this.canvas.height

        this.position.x = this.relPos.x * this.canvas.width
        this.position.y = this.relPos.y*this.maxHeight

        let x = this.relPos.x * this.canvas.width
        let y = (h - this.height) - this.relPos.y*this.maxHeight

        // Draw Image if Loaded
        if (this.imageLoaded) this.ctx.drawImage(this.image, x, y, this.width, this.height);

        // Draw Rock Placeholder
        this.ctx.beginPath();
        this.ctx.rect(x, y, this.width, this.height);
        this.ctx.fillStyle = 'red'
        this.ctx.fill()        
    }
}