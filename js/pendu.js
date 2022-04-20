const hangman = document.getElementById("hangman");
const userInput = document.getElementById("userInput");
const begin = document.querySelector("button");
const img = document.querySelector("img");
const p = document.getElementById("para");

begin.addEventListener("click", play);

userInput.value = "";

let letters = [];

/* word to guess */
let toGuess;

/* to hide word */
let hidden = [];

/* number of round */
let count = 0;

/* number of errors */
let errors = 0;

/* letters found */
let goodLetters = 0;

let divAlpha;

let alphabet = [
	"A","B","C","D","E","F",
	"G","H","I","J","K","L",
	"M","N","O","P","Q","R",
	"S","T","U","V","W","X",
	"Y","Z", " "
];

/* play game */
function play() {
	if (userInput.value.length !== 0) {
		toGuess = userInput.value.toUpperCase();
		userInput.hidden = "true";
		begin.hidden = "true";
		hangman.hidden = "false";
		createWordSpace();
		createLetters();
	}
}

/* space between letter  */ 
function createWordSpace() {
	for (let i = 0; i < toGuess.length; i++) {
		hidden[i] = document.createElement("div");
		hidden[i].className = "box";
		hidden[i].tabIndex = i;
		hangman.appendChild(hidden[i]);
	}
}

/* create letters */
function createLetters() {

	/* contains letters */
	divAlpha = document.createElement("div");
	divAlpha.className = "alphabet";
	document.body.insertBefore(divAlpha,p);

	for (let i = 0; i < alphabet.length; i++) {

		/* div with letter */
		letters[i] = document.createElement("div");
		letters[i].className = "letter";

		/* letter content */
		let content = document.createTextNode(alphabet[i]);
		letters[i].appendChild(content);
		divAlpha.appendChild(letters[i]);
		letters[i].id = alphabet[i];
		letters[i].addEventListener("click", chooseLetter);
	}
}

/* end of game */
function end() {
	
	if (goodLetters === toGuess.length) {
		p.textContent= "Gagné ! Coups utilisés : " + count;
	} else {
		p.textContent = "Perdu ! Coups utilisés : " + count;
	}

	for (let i = 0; i < 26; i++) {
		letters[i].removeEventListener("click", chooseLetter);
	}

	/* remove alphabet */
	document.body.removeChild(divAlpha);

	let replay = document.createElement("button");
	let content = document.createTextNode("Rejouer");
	replay.appendChild(content);
	document.body.appendChild(replay);
	replay.addEventListener("click", restart);
}

/* reload page */
function restart() {
	location.reload();
}

/* user click on letter */
function chooseLetter() {
	count++;
	let ok = false;
	for (let i = 0; i < toGuess.length; i++) {
		if (this.id === toGuess[i]) {
			hidden[i].textContent = this.id;
			this.hidden = "true";
			hidden[i].className = "boxFound";
			goodLetters++;
			ok = true;
		} else {
			this.style.color = "red";
		}
	}

	if (!ok) {
        errors++;
		img.src = "img/pendu" + errors + ".PNG";
		img.height = 600;
		img.width = 650;
	}

	if (goodLetters === toGuess.length || errors > 10) {
		end();
	}
}

