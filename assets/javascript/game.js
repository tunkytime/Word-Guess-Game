// GLOBAL VARIABLES
var wins = 0;
var lives = 3;
var currentWord;
var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var countGuesses;
var answer = [];
var lettersGuessed = [];
var guess = "";

// ARRAY OF WORDS AND IMAGES
var words = [{
		word: "COMET",
		img: 'assets/images/comet.jpg',
	},
	{
		word: "ANDROMEDA",
		img: 'assets/images/andromeda.jpg',
	},
	{
		word: "GALAXY",
		img: 'assets/images/galaxy.jpg',
	},
	{
		word: "INTERSTELLAR",
		img: 'assets/images/interstellar.jpg',
	},
	{
		word: "COSMOS",
		img: 'assets/images/cosmos.jpg',
	},
	{
		word: "NEBULA",
		img: 'assets/images/nebula.jpg',
	},
	{
		word: "NOVA",
		img: 'assets/images/nova.jpg',
	},
	{
		word: "SUPERNOVA",
		img: 'assets/images/supernova.jpg',
	},
	{
		word: "EXTRATERRESTIAL",
		img: 'assets/images/extraterrestial.jpg',
	},
	{
		word: "UNIVERSE",
		img: 'assets/images/universe.jpg',
	},
]

// BACKGROUNDS
var backgrounds = [
	'assets/images/bg2.jpg',
	'assets/images/bg3.jpg',
	'assets/images/bg4.jpg',
	'assets/images/bg5.jpg',
	'assets/images/bg6.jpg',
];

// MESSAGES
var messages = {
	incorrect: "You're getting closer to the black hole...",
	correct: "Brilliant!",
	noMoreGuesses: "You fell into the black hole!",
	alreadyGuessed: "You already guessed that, please try again",
	notLetter: "Please enter a letter from A-Z",
};

// SOUNDS
var playCorrect = document.createElement("audio");
playCorrect.setAttribute("src", "assets/sounds/deepscan.mp3");

var playIncorrect = document.createElement("audio");
playIncorrect.setAttribute("src", "assets/sounds/spacewoosh.wav");

var playVoice = document.createElement("audio");
playVoice.setAttribute("src", "assets/sounds/lose-voice.wav");

var playYell = document.createElement("audio");
playYell.setAttribute("src", "assets/sounds/yell.wav");

// Gets Link for Theme Song
var themeSong = document.createElement("audio");
themeSong.setAttribute("src", "assets/sounds/theme.mp3");

$(".begin-button").on("click", function () {
	themeSong.play();
});

$(".theme-button").on("click", function () {
	themeSong.play();
});

// Theme Button
$(".pause-button").on("click", function () {
	themeSong.pause();
});

$(document).ready(function () {

	var game = {
		changeHint: function () {
			$("#hintImage").attr("src", currentWord.img);
		},
		newWord: function () {
			answer = [];
			lettersGuessedArr = [];
			lettersGuessed = lettersMatched = "";
			countLettersMatched = 0;
			countGuesses = 25;

			// UPDATE STATS
			$("#countWins").html(wins);
			$("#countLives").html(lives);
			$("#countGuesses").html(countGuesses);
			$("#lettersGuessed").html(lettersGuessedArr.join(" "));

			// CHOOSE RANDOM WORD
			currentWord = words[Math.floor(Math.random() * words.length)];
			this.changeHint();

			// EMPTY ANSWER ARRAY TO STORE LETTERS
			for (var i = 0; i < currentWord.word.length; i++) {
				answer[i] = "_";
			}
			$("#currentWord").html(answer.join(" "));
		},
		loseMusic: function () {
			var x = document.createElement("audio");
			x.setAttribute("src", "assets/sounds/lose-music-2.mp3");
			x.setAttribute("loop", "true");
			x.play();
		},
		winMusic: function () {
			var x = document.createElement("audio");
			x.setAttribute("src", "assets/sounds/win-music.mp3");
			x.setAttribute("loop", "true");
			x.play();
		},
		roundOver: function () {
			if (lives === 0) {
				$("#gameplay").css("display", "none");
				$("#gameover").css("display", "block");
				$("body").css("background-repeat", "no repeat");
				$("body").css("background-size", "cover");
				$("body").css("background-image", "url('assets/images/blackhole-bg.jpg')");
				$(".spaceman-gameover").css("display", "block");
				themeSong.pause();
				playVoice.play();
				setTimeout(this.loseMusic, 300);
			} else if (words.length === 0) {
				$("#gameplay").css("display", "none");
				$("#youwin").css("display", "block");
				$("body").css("background-repeat", "no repeat");
				$("body").css("background-size", "cover");
				$("body").css("background-image", "url('assets/images/earth.png')");
				$(".spaceman-win").css("display", "block");
				themeSong.pause();
				setTimeout(this.winMusic, 50);
			} else {
				this.newWord();
			}
		},
		blackHole: function () {
			$(".spaceman-gameplay").animate({
				left: "+=100",
				top: "+=105",
				opacity: "0"
			}, 300, function () {
				$(this).removeAttr("style");
			});
		},
		changeBg: function () {
			$("body").css("background-image", "url(" + backgrounds[Math.floor(Math.random() * backgrounds.length)] + ")");

		},
		gameRound: function () {
			document.onkeyup = function () {
				var guess = String.fromCharCode(event.keyCode).toUpperCase();

				// CHECK IF LETTER KEY IS PRESSED
				if (letters.indexOf(guess) !== -1) {
					if ((lettersMatched && lettersMatched.indexOf(guess) !== -1) || (lettersGuessed && lettersGuessed.indexOf(guess) !== -1)) {
						$("#message").html(messages.alreadyGuessed);
					} else if (currentWord.word.indexOf(guess) !== -1) {
						for (var i = 0; i < currentWord.word.length; i++) {
							if (currentWord.word[i] === guess) {
								answer[i] = guess;
								$("#currentWord").html(answer.join(" "));
							}
						}
						for (var i = 0; i < currentWord.word.length; i++) {
							if (currentWord.word.charAt(i) === guess) {
								countLettersMatched += 1;
							}
						}
						lettersMatched += guess;
						if (countLettersMatched === currentWord.word.length) {
							playCorrect.play();
							wins++;
							$("#message").html(messages.correct + " The mystery was " + currentWord.word);
							$("#countWins").html(wins);

							// REMOVE WORD AND IMAGE FROM ARRAY
							words.splice(words.indexOf(currentWord), 1);
							game.roundOver();
						}
					} else {
						lettersGuessed += guess;
						lettersGuessedArr.push(guess);
						countGuesses -= 5;
						$("#message").html(messages.incorrect);
						$("#lettersGuessed").html(lettersGuessedArr.join(" "));
						$("#countGuesses").html(countGuesses);
						if (countGuesses === 0) {
							lives--;
							playIncorrect.play();
							game.blackHole();
							game.changeBg();
							console.log(words);
							$("#countLives").html(lives);
							$("#message").html(messages.noMoreGuesses);
							game.roundOver();
						}
					}
				} else {
					$("#message").html(messages.notLetter);
				}
			}
		},
	};

	// SHOW GAME INSTRUCTIONS
	$(window).on("load", function () {
		$("#gameModal").modal("show");
	});

	// GAMEPLAY
	game.newWord();
	game.roundOver();
	game.gameRound();

	// RELOAD PAGE TO PLAY AGAIN
	$(".playAgain").click(function () {
		location.reload();
	});
});