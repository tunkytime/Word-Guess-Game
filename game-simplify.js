// GLOBAL VARIABLES
var wins = 0;
var lives = 3;
var currentWord;
var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var countGuesses;
var answer = [];
var lettersGuessed = [];
var guess;

// ARRAY OF RANDOM WORDS
var words = [
    "COMET",
    "EARTH",
    "GALAXY",
    "INTERSTELLAR",
    "COSMOS",
    "NEBULA",
    "NOVA",
    "SUPERNOVA",
    "EXTRATERRESTIAL",
    "UNIVERSE"
];

// MESSAGES TO DISPLAY
messages = {
    correctWord: "Brilliant!",
    noMoreGuesses: "You fell into the black hole!",
    wrongGuess: "You're getting closer to the black hole...",
    alreadyGuessed: "You already guessed that, please try again",
    notLetter: "Please enter a letter from A-Z",
    ultimateWinner: "YOU WIN",
    ultimateLoser: "YOU LOSE",
    correct: "You got it right",
    incorrect: "Wrong"
};

$(document).ready(function () {

    // SHOW MODAL WITH GAME INSTRUCTIONS
    $(window).on("load", function () {
        $("#gameModal").modal("show");
    });

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
        $("#lettersGuessed").html(lettersGuessedArr.join(" "));

        // CHOOSE RANDOM WORD FROM words ARRAY
        currentWord = words[Math.floor(Math.random() * words.length)];

        // EMPTY ANSWER ARRAY TO STORE LETTERS OF CURRENT WORD
        for (var i = 0; i < currentWord.length; i++) {
            answer[i] = "_";
        }
        $("#currentWord").html(answer.join(" "));
    }

    // GAME ROUND
    function gameRound() {
        document.onkeyup = function () {
            var guess = String.fromCharCode(event.keyCode).toUpperCase();

            // CHECK IF KEY PRESSED IS A LETTER
            if (letters.indexOf(guess) !== -1) {
                if ((lettersMatched && lettersMatched.indexOf(guess) !== -1) || (lettersGuessed && lettersGuessed.indexOf(guess) !== -1)) {
                    $("#message").html(messages.alreadyGuessed);
                } else if (currentWord.indexOf(guess) !== -1) {
                    for (var i = 0; i < currentWord.length; i++) {
                        if (currentWord[i] === guess) {
                            answer[i] = guess;
                            $("#currentWord").html(answer.join(" "));
                        }
                    }
                    for (var i = 0; i < currentWord.length; i++) {
                        if (currentWord.charAt(i) === guess) {
                            countLettersMatched += 1;
                        }
                    }
                    lettersMatched += guess;
                    if (countLettersMatched === currentWord.length) {
                        wins++;
                        words.splice(words.indexOf(`${currentWord}`), 1);
                        $("#countWins").html(wins);
                        endRound();
                    }
                } else {
                    lettersGuessed += guess;
                    lettersGuessedArr.push(guess);
                    countGuesses -= 5;
                    $("#lettersGuessed").html(lettersGuessedArr.join(" "));
                    $("#countGuesses").html(countGuesses);
                    if (countGuesses === 0) {
                        lives--;
                        $("#countLives").html(lives);
                        endRound();
                    }
                }
            } else {
                $("#message").html(messages.notLetter);
            }
        };
    };
    // END GAME ROUND

    // DETERMINE IF USER WINS OR LOSES
    function endRound() {
        if (words.length === 0) {
            $("#message").html(messages.ultimateWinner);
            gameOver();
        } else {
            $("#message").html(messages.correct);
            newWord();
        }
        if (lives === 0) {
            $("#message").html(messages.ultimateLoser);
            gameOver();
        } else {
            $("#message").html(messages.incorrect);
            newWord();
        }
    };
    // END OF WINS OR LOSES

    // GAME OVER
    function gameOver() {
        if (words.length === 0) {
            document.getElementById("gameplay").style.display = "none";
            document.getElementById("youwin").style.display = "block";
            playSoundYell();
            setTimeout(playSoundWinningMusic, 2000);
        } else {
            document.getElementById("gameplay").style.display = "none";
            document.getElementById("gameover").style.display = "block";
            document.getElementById("spaceman-gameover").style.display = "block";
            playSoundGameOver();
            setTimeout(playSoundMusic, 3000);
        }
    }
    newWord();
    gameRound();
});