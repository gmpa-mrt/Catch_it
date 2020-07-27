const easy = document.getElementById('easy');
const normal = document.getElementById('normal');
const hard = document.getElementById('hard');

export let speedHero; 
export let speedEnnemies;

export function selectDifficulty(){
    if(easy.checked){
        speedHero = 0
        speedEnnemies = 0
        speedHero = 5; 
        speedEnnemies = 2;
    }else if(normal.checked){
        speedHero = 0
        speedEnnemies = 0
        speedHero = 10; 
        speedEnnemies = 5;
    }else if(hard.checked){
        speedHero = 0
        speedEnnemies = 0
        speedHero = 12; 
        speedEnnemies = 8;
    }
}