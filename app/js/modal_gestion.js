const inputPseudo = document.getElementById('pseudo');

export function display_stats(){
	document.getElementById("modal_stats").className=('modal');
}
export function hidden_stats(){
    document.getElementById("modal_stats").className=('hidden');
}

export function display_save(){
	document.getElementById('modal_save').className=('modal')
}

export function confirm_save(){
	if(inputPseudo.value)
	document.getElementById('modal_save').className=('hidden')
}
export function hidden_save() {
	document.getElementById('modal_save').className=('hidden')
}

export function display_rules() {
	document.getElementById('modal_rules').className=('modal')
}
export function hidden_rules() {
	document.getElementById('modal_rules').className=('hidden')
}