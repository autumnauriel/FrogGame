import {Player} from './player.js'


// Canvas
let canvas = document.querySelector('canvas')
// canvas.style.width = '100%'
// canvas.style.height = '100%'
var ctx = canvas.getContext("2d");

// Player
let player = new Player(canvas)

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

	// Check Player / Object Collisions
	let obj = {}
	player.checkCollision(obj)

	// Draw Player
	player.draw()

	// Run Animation Again
	setTimeout(animate, 1000/60)

}

animate()

document.onkeydown = player.jump

window.onresize = () => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	canvas.style.width = `${window.innerWidth}px`
	canvas.style.height = `${window.innerHeight}px`
}

window.onresize()