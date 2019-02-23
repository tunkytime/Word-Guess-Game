// GLOBAL VARIABLES
	var wins = 0;
	var lives = 3;
	var currentWord;
	var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var countGuesses;
	var answer = [];
	var lettersGuessed = [];
	var guess;
	
	// ARRAY OF WORDS AND IMAGES
	var words = [
		{ 	word: "COMET",
			img: 'assets/images/comet.jpg',
			},
		{ 	word: "EARTH",
			img: 'assets/images/earth.jpg',
			},
		{ 	word: "GALAXY",
			img: 'assets/images/galaxy.jpg',
			},
		{	word: "INTERSTELLAR",
			img: 'assets/images/interstellar.jpg',
			},
		{	word: "COSMOS",
			img: 'assets/images/cosmos.jpg',
			},
		{	word: "NEBULA",
			img: 'assets/images/nebula.jpg',
			},
		{	word: "NOVA",
			img: 'assets/images/nova.jpg',
			},
		{	word: "SUPERNOVA",
			img: 'assets/images/supernova.jpg',
			},
		{	word: "EXTRATERRESTIAL",
			img: 'assets/images/extraterrestial.jpg',
			},
		{	word: "UNIVERSE",
			img: 'assets/images/universe.jpg',
			},
	]

	// BACKGROUNDS TO BE USED
	var backgrounds = [
		'assets/images/bg2.jpg',
		'assets/images/bg3.jpg',
		'assets/images/bg4.jpg',
		'assets/images/bg5.jpg',   
		'assets/images/bg6.jpg',   
	];

	// MESSAGES TO DISPLAY
	var messages = {
		incorrect: "You're getting closer to the black hole...",
		correct: "Brilliant!",
		noMoreGuesses: "You fell into the black hole!",
		alreadyGuessed: "You already guessed that, please try again",
		notLetter: "Please enter a letter from A-Z",
	};

	// SOUNDS TO PLAY
	var sounds = {
		playCorrect: function () {
			document.getElementById("correctSound").play();
		},
		playIncorrect: function () {
			document.getElementById("incorrectSound").play();
		},
		playVoice: function () {
			document.getElementById("voice").play();
		},
		playYouLose: function () {
			document.getElementById("youLoseMusic").play();
		},
		playYell: function () {
			document.getElementById("yell").play();
		},
		playYouWin: function () {
			document.getElementById("youWinMusic").play();
		}
	};

$(document).ready(function () {
		
    // SHOW MODAL WITH GAME INSTRUCTIONS
    $(window).on("load", function () {
        $("#gameModal").modal("show");
    });
	
	// CHANGE BACKGROUND IMAGE
	function changeBg () {
		$(".background").css("background-image", "url(" + backgrounds[Math.floor(Math.random() * backgrounds.length)] + ")");
	};
		
    // RESET WORD AND GUESSES
    function newWord() {
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

        // CHOOSE RANDOM WORD AND ASSOCIATED IMAGE FROM words ARRAY
		currentWord = words[Math.floor(Math.random() * words.length)];
		console.log(currentWord);
		console.log(words.indexOf(currentWord));
		
		changeHint();
		
        // EMPTY ANSWER ARRAY TO STORE LETTERS OF CURRENT WORD
        for (var i = 0; i < currentWord.word.length; i++) {
            answer[i] = "_";
        }
        $("#currentWord").html(answer.join(" "));
    }
	
	// UPDATE HINT IMAGE
	function changeHint() {
		$("#hintImage").attr("src", currentWord.img);
	};
	
    // GAME ROUND
    function gameRound() {
        document.onkeyup = function () {
            var guess = String.fromCharCode(event.keyCode).toUpperCase();

            // CHECK IF KEY PRESSED IS A LETTER
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
						sounds.playCorrect();
                        wins++;
						$("#message").html(messages.correct + " The mystery was " + currentWord);
                        $("#countWins").html(wins);
						
						// REMOVE WORD AND IMAGE FROM ARRAY AFTER GUESSED CORRECTLY
                        words.splice(words.indexOf(currentWord), 1);
						roundOver();
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
						sounds.playIncorrect();
						changeBg();
						console.log(words);
                        $("#countLives").html(lives);
						$("#message").html(messages.noMoreGuesses);
						roundOver();
                    }
                }
            } else {
                $("#message").html(messages.notLetter);
            }
        };
    };
    // END GAME ROUND

	// CHECK WHETHER TO CONTINUE GAME OR END GAME
	function roundOver() {
		if (lives === 0) {
			$("#gameplay").css("display", "none");
			$("#gameover").css("display", "block");
			$(".spaceman-gameover").css("display", "block");
			sounds.playVoice();
			setTimeout(sounds.playYouLose, 2000);
		} else if (words.length === 0) {
			$("#gameplay").css("display", "none");
			$("#youwin").css("display", "block");
			$(".spaceman-win").css("display", "block");
			sounds.playYell();
			setTimeout(sounds.playYouWin, 2000);
		} else {
			newWord();
		}
	};
	// END CHECK

	// RELOAD PAGE WHEN BUTTON CLICKED
	$(".playAgain").click(function() {
		location.reload();
	});
	
	// INVOKE FUNCTIONS TO PLAY GAME
    newWord();
    gameRound();
});







