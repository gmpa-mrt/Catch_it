import {hero, ruby, zomby, robot} from './characters';
import {speedHero, speedEnnemies} from './difficulty';
import {reset} from './gameLife';


const keysDown = [];

addEventListener("keydown", (e) => {
	keysDown[e.keyCode] = true;
}, false);

addEventListener('keyup', (e) => {
	delete keysDown[e.keyCode];
}, false);


export let rubyCaught = 0;


export const init = (nbr) => {
	document.getElementById("end_message").className='hidden';
	document.getElementById("menu_in_game").className='display'
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	hero.hp = nbr;
	rubyCaught = 0;
}


export const update = () => {

	zomby.y += (speedEnnemies + rubyCaught/2);

	if(rubyCaught >= 10){
		robot.x += speedEnnemies
	}else if (rubyCaught >= 25){
		robot.x += (speedEnnemies + (rubyCaught/2))
	}


	if (38 in keysDown) { // Player holding up
		hero.y -= speedHero;
	};
	if (40 in keysDown) { // Player holding down
		hero.y += speedHero;
	};
	 if (37 in keysDown) { // Player holding left
	 	hero.x -= speedHero;
	};
	if (39 in keysDown) { // Player holding right
		hero.x += speedHero;
	};

	// Are they touching?
	if (
		hero.x <= (ruby.x + 32)
		&& ruby.x <= (hero.x + 32)
		&& hero.y <= (ruby.y + 32)
		&& ruby.y <= (hero.y + 32)
	) {
		++rubyCaught;
		reset();
	}

	if (
		hero.x <= (zomby.x + 32)
		&& zomby.x <= (hero.x + 32)
		&& hero.y <= (zomby.y + 32)
		&& zomby.y <= (hero.y + 32)
	) {
		hero.hp--;
		reset();
	}

	// Border
	if (hero.x <= 0){
		hero.x = 1;
	}
	if (hero.x >= (canvas.width - 40)){
		hero.x =  (canvas.width - 40) - 1  // 1 => reset position  / -20  img size
	}
	if (hero.y <= 0){
		hero.y = 1;
	}
	if (hero.y >= (canvas.height - 40)){
		hero.y =  (canvas.height - 40) -1 // 1 => reset position  / -20  img size
	}
	if(zomby.y >= canvas.height - 40){
		zomby.x =32 + (Math.random() * (canvas.width - 64));
		zomby.y = Math.floor ((Math.random() * (-800)))
	}


};