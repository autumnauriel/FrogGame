var character = document.getElementById("character");
var block = document.getElementById("block");
var counter = 0;
function jump(){
	if(character.classList != "animate") {
			character.classList.add("animate");
	}
	setTimeout(function(){
		character.classList.remove("animate");
	},500);
}

var checkHit = setInterval(function(){
	var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
	var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
	if(blockLeft<20 && blockLeft>0 && characterTop>=130){
		block.style.animation = "none";
		alert("Game Over. score: "+Math.floor(counter/100));
		counter=0;
		block.style.animation = "block is infinite linear";
	} else{
		counter++;
		document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
	}
},10);
