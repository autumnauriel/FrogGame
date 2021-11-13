import { Fly } from './fly.js';
import {Player} from './player.js'

let fliesToCatch = 50

// Canvas
let canvas = document.querySelector('canvas')
// canvas.style.width = '100%'
// canvas.style.height = '100%'
var ctx = canvas.getContext("2d");

// Player
let player = new Player(canvas)

// flies
let n = 10
let flies = Array.from({length: n}, e => new Fly(canvas))

// Background
let loaded = false
let background = new Image();
background.src = './background.jpg';
background.onload = () => {
	loaded = true
}

// Main Animation Loop
let animate = () => {

	// Clear Canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw Background
	if (loaded) ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	// Update Objects
	flies.forEach(r => r.update())
	player.update()

	// Check Player / Object Collisions
	flies.forEach(r => player.checkCollision(r))

	// Draw Objects
	flies.forEach(r => r.draw())
	player.draw()

	// Check Endgame
	if (player.flies >= fliesToCatch) {
		document.querySelector('#winmessage').style = 'block'
		canvas.style.opacity = 0.3
	}

	// Run Animation Again
	setTimeout(animate, 1000/60)

}

animate()

// Add Jump Command for Button Presses (any)
document.onkeydown = player.jump


// Resize Canvas to Fit Window
window.onresize = () => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
}

window.onresize()