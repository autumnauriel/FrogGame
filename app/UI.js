import { Fly } from './fly.js';
import {Player} from './player.js'

class UI {

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
export { UI }