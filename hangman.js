//Hangman Game

//generates random number between 0 and 19
var wordSelector = Math.floor(Math.random()*19);

//array to store random words pulled from WordNik
var wordArray = [];
var guessArray = [];
var wordValidator = 0;
var guessCounter = 1;
//var guessHolder = [];

//console.log(wordSelector);


//call this function to start the game 
//calls the next function
function startGame() {
    console.log("Let's Play HangMan!");
    console.log("Here are the rules of the game");
    console.log("The computer will select a random word between 4 and 10 characters");
    console.log("You will input a single letter at each prompt.");
    console.log("Guess 5 letters wrong and you are dead!");
    console.log("Good Luck!");
    //calls function to generate a random word
    getWordList();
}


//get a random word list of 20 words from WordNik, between 4 and 10 letters
function getWordList() {
var request = require('request');
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
  //console.log(randomWord);
  displayWord(randomWord);
});
}

//displays the word length in underscores by populating
//the array that hold the guesses
function displayWord(randWord) {
    for (var i = 0; i < randWord.length; i++) {
        guessArray.push("__");
    }
    console.log("");
    console.log("your word has " + randWord.length + " characters.") ; 
    guessArrayToString(guessArray);
    //console.log(guessArray);
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
    console.log("");
    console.log("Enter a letter:");
    var prompt = require('prompt');
      prompt.start();
      prompt.get('userGuess', function (error, result) {
          if (error) {
          console.log("There was an error: " + error);
        }
        var guess = result.userGuess;
        //if user inputs more than one letter, uses the first one
        //changes input to lowercase
        guess.charAt(0).toLowerCase();
        //call function to check randword and userGuess
        checkGuess(guess, randword);
    });
}

function checkGuess(letterGuess, wordToGuess) {
    var guessValidator = 0;
    for (var j = 0; j < wordToGuess.length; j++) {
        if (wordToGuess.charAt(j) === letterGuess) {
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
            console.log("Oh no! You are one step closer to death!");
            console.log("you have " + (6-guessCounter) + " guesses left!");
            //call guess again function
            guessLetter(wordToGuess);
        }
        else {
        console.log("YOU LOOSE!");
        hangManTemplate[2]  = "  |    x_x ";
        drawHangman();
        guessArrayToString();
        console.log("The answer was: " + wordToGuess);
        }
    } 
    
    if (guessValidator > 0) {
        if (wordValidator < wordToGuess.length) {
            //console.log("Good Guess!")
            guessArrayToString();
            guessLetter(wordToGuess);
        }
        else {
        //call win function!
        console.log("YOU WIN!");
        console.log("The word was: ");
        guessArrayToString();
        }
    }
}

//hangman drawing function
var hangManTemplate = [];
    hangManTemplate[0] = "  _________";
    hangManTemplate[1] = "  |/    |  ";
    hangManTemplate[2] = "  |        ";
    hangManTemplate[3] = "  |        ";
    hangManTemplate[4] = "  |        ";
    hangManTemplate[5] = "  |        ";
    hangManTemplate[6] = "  |        ";
    hangManTemplate[7] = "  |        ";
    hangManTemplate[8] = "__|____    ";

var hungManTemplate = [];
    hungManTemplate[0] = "  _________";
    hungManTemplate[1] = "  |/    |  ";
    hungManTemplate[2] = "  |    (_) ";
    hungManTemplate[3] = "  |     |  ";
    hungManTemplate[4] = "  |    \\|/ ";
    hungManTemplate[5] = "  |     |  ";
    hungManTemplate[6] = "  |    / \\ ";
    hungManTemplate[7] = "  |        ";
    hungManTemplate[8] = "__|____    ";

function drawHangman() {
    hangManTemplate[guessCounter] = hungManTemplate[guessCounter];
    for (var i = 0; i<hangManTemplate.length; i++) {
        console.log(hangManTemplate[i]);
    }
}


startGame();
