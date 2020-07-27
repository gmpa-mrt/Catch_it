import {canvas, context} from './createCanvas';
import {hero, ruby, zomby, robot} from './characters';
import {reset} from './gameLife';
import {init, update, rubyCaught} from './update'
import {display_stats, hidden_stats, display_save, hidden_save, confirm_save, display_rules, hidden_rules} from './modal_gestion';


document.getElementById("restart").addEventListener("click", restart);
document.getElementById("pause").addEventListener("click", pause);
document.getElementById("end").addEventListener("click", end);

document.getElementById("stats").addEventListener("click", display_stats);
document.getElementById("close_modal").addEventListener("click", hidden_stats);


document.getElementById("rules").addEventListener("click", display_rules);
document.getElementById("close_modal_rules").addEventListener("click", hidden_rules);

document.getElementById("btn_save").addEventListener("click", display_save);
document.getElementById("confirm").addEventListener("click", confirm_save)
document.getElementById("back").addEventListener("click", hidden_save)

let score = document.getElementById('score');
const form = document.querySelector('form');



// Background image
let backgroundReady = false;
let backgroundImage = new Image();
backgroundImage.onload = function () {
    backgroundReady = true;
};
backgroundImage.src = "./img/background/blue.png";


// Hero image
let hReady = false;
let hImage = new Image();
hImage.onload = function () {
    hReady = true;
};
hImage.src = "./img/hero.png";


//Zomby image
let zombyReady = false;
let zombyImage = new Image();
zombyImage.onload = () => {
	zombyReady = true;
};
zombyImage.src = "./img/zomby.png";

//Robot image
let robotReady = false;
let robotImage = new Image();
robotImage.onload = () => {
	robotReady = true;
};
robotImage.src = "./img/robot.png"

// Ruby image
let rubyReady = false;
let rubyImage = new Image();
rubyImage.onload = function () {
    rubyReady = true;
};
rubyImage.src = "./img/ruby.png";



//Fonction Pause
let onPause = false;
function pause(){
	if(!onPause){
		onPause = true;

	}else{
		onPause = false;
		main()
	}
}

// Draw everything
const render = () => {
	if (backgroundReady) {
		context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
	}

	if (hReady) {
		context.drawImage(hImage, hero.x, hero.y, 40, 40);
	}

	if (rubyReady) {
		context.drawImage(rubyImage, ruby.x, ruby.y, 20, 20);
	}

	if (zombyReady){
		context.drawImage(zombyImage, zomby.x, zomby.y, 40, 40);
	}

	if (robotReady){
		context.drawImage(robotImage, robot.x, robot.y, 40, 40);
	}

	// // Score
	context.fillStyle = "rgb(250, 250, 250)";
	context.font = "24px Helvetica";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillText("Ruby caught: " + rubyCaught , 32, 32);

	// HP
	context.fillStyle = "rgb(250, 250, 250)";
	context.font = "24px Helvetica";
	context.textAlign = "right";
	context.textBaseline = "top";
	context.fillText("HP " + hero.hp, (canvas.width - 30), 5);
};


function restart() {
	init(3);
	reset();
	main();
}

function end() {
	document.getElementById('game').className=('hidden')
	document.getElementById('welcome').className=('welcome')
	restart();
}



let then = Date.now();

// The main game loop
const main = () => {
	var now = Date.now();
	var delta = now - then;
	let game = true;

	update(delta / 1000);
	render();

	then = now;

	if (hero.hp === 0){
		game = false;
		context.fillStyle = "rgb(250, 250, 250)";
		context.font = "24px Helvetica";
		context.textAlign = "center";
		context.fillText("GAME OVER", canvas.width /2, canvas.height /2);
		document.getElementById("menu_in_game").className='hidden'
		score.value = rubyCaught; // input modal
		return (document.getElementById("end_message").className='display');
	}else if (rubyCaught == 30){
		game = false;
		context.fillStyle = "rgb(250, 250, 250)";
		context.font = "24px Helvetica";
		context.textAlign = "center";
		context.fillText("WIN", canvas.width /2, canvas.height /2);
		document.getElementById("menu_in_game").className='hidden'
		score.value = rubyCaught; // input modal
		return (document.getElementById("end_message").className='display');
	}

	if (game && !onPause){
		// Request to do this again ASAP
		requestAnimationFrame(main);
	}else if (onPause){
		context.fillStyle = "rgb(250, 250, 250)";
		context.font = "24px Helvetica";
		context.textAlign = "center";
		context.fillText("PAUSE", canvas.width /2, canvas.height /2);
	}
};


init(3);
reset();
main();

