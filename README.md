# Hangman Game

### Overview

This is a hangman game with a space theme.

### Gameplay

1. Upon page load, a pop up box with game rules is displayed

   - Set to show on page load via jQuery

2. The user begins with the following stats and they continue to update as the game is played:

   - Wins: 0
   - Lives: 3
   - Distance to Black Hole: 25,000 Light Years

3. A word is randomly generated from an array of 10 possible words and display as a series of "\_" to the user

4. The user uses the keyboard to guess letters

   - If the user guesses correctly, the letter will replace the "\_" in the word
   - If the user guesses all the letters in the word, wins increase by 1, that word is removed from the list, and a new word is generated
   - If the user guesses incorrectly, the letter will be added to the "Letters Guesses:" array and displayed to the user

5. If the user runs out of guesses, they lose a life and fall through a black hole

   - If the user runs out of lives, a new screen appears, some music plays, and the game is over
   - A button appears asking the user if they want to play again

6. To win the game, the user must guess all 10 words correctly

   - If the user wins, a new screen appears, some music plays, and the game is over
   - A button appears asking the user if they want to play again
