import {ruby, zomby, robot} from './characters';
import {init} from './update';
import {selectDifficulty} from './difficulty'

document.getElementById("start").addEventListener("click", start);
document.getElementById("quit").addEventListener("click", quit);


export function reset() {

	// Throw the ruby somewhere on the screen randomly
	ruby.x = 32 + (Math.random() * (canvas.width - 64));
	ruby.y = 32 + (Math.random() * (canvas.height - 64));

	// Reset zomby
	zomby.x = 32 + (Math.random() * (canvas.width - 64));
	zomby.y = Math.floor ((Math.random() * (-800)));

	//Reset robot
	robot.x = Math.floor ((Math.random() * (-1000)));
	robot.y = (Math.random() * (canvas.width - 64));

	selectDifficulty();
};

export function quit(){
	document.getElementById('game').className=('hidden')
	document.getElementById('welcome').className=('welcome')
	init(3);
	reset();
};

export function start(){
	document.getElementById('game').className=('container_canvas')
	document.getElementById('welcome').className=('hidden')
};