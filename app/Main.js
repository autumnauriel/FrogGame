
export class Main {

    static id = String(Math.floor(Math.random() * 1000000))

    constructor() {

        // UI Identifier
        this.props = {
            fliesToCatch: 50,
            canvas: document.createElement('canvas'),
            container: document.createElement('div'),
            ctx: null,
            player: null,

            nFlies: 10,
            flies: [],

            loaded: false,
            background: new Image(),
        }

        this.props.background.src = './app/assets/background.jpg';
        this.props.background.onload = () => this.props.loaded = true
        this.props.ctx = this.props.canvas.getContext("2d");
        this.props.player = new Player(this.props.canvas)

        this.props.flies = Array.from({length: this.props.nFlies}, e => new Fly(this.props.canvas))

        // Port Definition
        this.ports = {
            jump: {
                onUpdate: (user) => {
                    // Command for left blink
                    if (user.value === true) this.props.player.jump()
                },
            },
            element: {
                data: this.props.container,
                input: { type: null },
                output: { type: Element }
            }
        }

        this.props.container.id = this.props.id
        this.props.container.style = 'height:100%; width:100%; display: flex; align-items: center; justify-content: center; background: black;'
        this.props.container.insertAdjacentElement('beforeend', this.props.canvas)
        this.props.container.onresize = this.responsive

    }

    init = () => {
        this._animate()
        this.responsive()
    }

    deinit = () => { }

    responsive = () => {
        this.props.canvas.width = this.props.container.clientWidth
	    this.props.canvas.height = this.props.container.clientHeight
    }

    _animate = () => {

        // Clear Canvas
        this.props.ctx.clearRect(0, 0, this.props.canvas.width, this.props.canvas.height);

        // Draw Background
        if (this.props.loaded) this.props.ctx.drawImage(this.props.background, 0, 0, this.props.canvas.width, this.props.canvas.height);

        // Update Objects
        this.props.flies.forEach(r => r.update())
        this.props.player.update()

        // Check Player / Object Collisions
        this.props.flies.forEach(r => this.props.player.checkCollision(r))

        // Draw Objects
        this.props.flies.forEach(r => r.draw())
        this.props.player.draw()

        // Check Endgame
        if (this.props.player.flies >= this.props.fliesToCatch) {
            // document.querySelector('#winmessage').style = 'block'
            this.props.canvas.style.opacity = 0.3
        }

        // Run Animation Again
        setTimeout(this._animate, 1000/60)

    }
}

// ------------------------- PLAYER CLASS ---------------------------

class Player {

    constructor(canvas) {

        this.canvas = canvas
        this.ctx = canvas.getContext("2d");

        this.position = {x: 0, y: 0}
        this.width = 100
        this.height = 100

        // Handle Image
        this.imageLoaded = false;
        this.image = new Image();
        this.image.src = './app/assets/derp.png';
        this.image.onload = () => {
            this.imageLoaded = true
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


// ------------------------- FLY CLASS ---------------------------

class Fly{
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
        this.image.src = './app/assets/derp.png';
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
        else {
            // Draw Rock Placeholder
            this.ctx.beginPath();
            this.ctx.rect(x, y, this.width, this.height);
            this.ctx.fillStyle = 'red'
            this.ctx.fill()        
        }
    }
}