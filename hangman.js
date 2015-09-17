//Hangman Game

//define modules
var request = require('request');
var prompt = require('prompt');

//declare global variables
var wordSelector = Math.floor(Math.random()*19);
var wordArray = [];
var guessArray = [];
var wordValidator = 0;
var guessCounter = 1;
var guessValidator = 0;
var hangManTemplate = [];
var hungManTemplate = [];

//call this function to start the game 
function startGame() {
    console.log("Let's Play HangMan!");
    console.log("Here are the rules of the game");
    console.log("The computer will select a random word between 4 and 10 characters");
    console.log("You will input a single letter at each prompt.");
    console.log("Guess incorrectly 5 times and you are dead!");
    console.log("Good Luck!");
    
    //resets all of the variables 
    wordSelector = Math.floor(Math.random()*19);
    while(wordArray.length > 0) {
        wordArray.pop();
    }
    while(guessArray.length > 0) {
        guessArray.pop();
    }
    wordValidator = 0;
    guessCounter = 1;
    guessValidator = 0;
    
    //fills in the hangManTemplate
    hangManTemplate[0] = "  _________";
    hangManTemplate[1] = "  |/    |  ";
    hangManTemplate[2] = "  |        ";
    hangManTemplate[3] = "  |        ";
    hangManTemplate[4] = "  |        ";
    hangManTemplate[5] = "  |        ";
    hangManTemplate[6] = "  |        ";
    hangManTemplate[7] = "  |        ";
    hangManTemplate[8] = "__|____    ";
    
    //calls function to generate a random word
    getWordList();
}


//get a random word list of 20 words from WordNik, between 4 and 10 letters
function getWordList() {
request('http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&excludePartOfSpeech=verb&minCorpusCount=55000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=4&maxLength=10&sortBy=count&sortOrder=asc&limit=20&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5', function (error, response, body) {
  if (error) {
      console.log("There was an error: " + error);
  }
  if (!error && response.statusCode == 200) {
    var wordList = JSON.parse(body);
    for (var i = 0; i < 19; i++){
        wordArray.push((wordList[i].word)); 
    }
  }
  //pass the random selected word to the next function
  var randomWord = wordArray[wordSelector].toLowerCase();
  console.log(randomWord);
  displayWord(randomWord);
});
}

//displays the word length in underscores by populating
//the array that hold the guesses
function displayWord(randWord) {
    console.log(randWord);
    for (var i = 0; i < randWord.length; i++) {
        guessArray.push("__");
    }
    console.log("\nyour word has " + randWord.length + " characters.") ; 
    guessArrayToString(guessArray);
    guessLetter(randWord);
}

//this function displays the user's gueses in a string
//instead of an array
function guessArrayToString() {
    var guessString = "";
    for (var i =0; i < guessArray.length; i++) {
    guessString += guessArray[i] + " ";
    }
    console.log(guessString);
}

function guessLetter(randword) {
    console.log("\nEnter a letter:");
      prompt.start();
      prompt.get('userGuess', function (error, result) {
          if (error) {
          console.log("There was an error: " + error);
        }
        
        //if user inputs more than one letter, uses the first one
        var guess = result.userGuess.charAt(0);
        //changes input to lowercase
        guess.toLowerCase();
        //call function to check randword and userGuess
        checkGuess(guess, randword);
    });
}

function checkGuess(letterGuess, wordToGuess) {
    guessValidator = 0;
    for (var j = 0; j < wordToGuess.length; j++) {
        if ((wordToGuess.charAt(j) === letterGuess) && (letterGuess !== guessArray[j])) {
            guessArray[j] = letterGuess;
            guessValidator +=1;
            wordValidator += 1;
        }
    }
    
    if (guessValidator === 0) {
        guessCounter += 1;
        if (guessCounter < 6) {
            //calls drawHangman function
            drawHangman(guessCounter);
            //draws the word
            guessArrayToString();
            console.log("\nOh no! There was no " + letterGuess + " in the word!");
            console.log("Guess incorrectly " + (6-guessCounter) + " more times and you are dead!");
            //call guess again function
            guessLetter(wordToGuess);
        }
        else {
            console.log("YOU LOSE!");
            hangManTemplate[2]  = "  |    x_x ";
            drawHangman(guessCounter);
            guessArrayToString();
            console.log("The answer was: " + wordToGuess + "\n");
            playAgain();
        }
    } 
    
    if (guessValidator > 0) {
        if (wordValidator < wordToGuess.length) {
            guessArrayToString();
            guessLetter(wordToGuess);
        }
        else {
            console.log("YOU WIN!");
            console.log("The word was: ");
            guessArrayToString();
            playAgain();
        }
    }
}

//hangman drawing function
hungManTemplate[0] = "  _________";
hungManTemplate[1] = "  |/    |  ";
hungManTemplate[2] = "  |    (_) ";
hungManTemplate[3] = "  |     |  ";
hungManTemplate[4] = "  |    \\|/ ";
hungManTemplate[5] = "  |     |  ";
hungManTemplate[6] = "  |    / \\ ";
hungManTemplate[7] = "  |        ";
hungManTemplate[8] = "__|____    ";

function drawHangman(guesses) {
    hangManTemplate[guesses] = hungManTemplate[guesses];
    for (var i = 0; i<hangManTemplate.length; i++) {
        console.log(hangManTemplate[i]);
    }
}

function playAgain() {
    console.log("Would you like to play again?");
    console.log("y/n");
    prompt.start();
    prompt.get('play_again', function (error, result) {
        if (error) {
            console.log("There was an error: " + error);
        }
        var userPlay = result.play_again.toLowerCase();
        if (userPlay.charAt(0) === "y") {
            startGame();
        }
        else {
            console.log("\nThanks for playing!");
        }
    });
} 


startGame();
