//Hangman Game

//generates random number between 0 and 19
var wordSelector = Math.floor(Math.random()*19);

//array to store random words pulled from WordNik
var wordArray = [];
var guessArray = [];
var wordValidator = 0;
var guessCounter = 0;
//var guessHolder = [];

console.log(wordSelector);

//function ONE
//call this function to start the game 
//calls the next function
function startGame() {
    console.log("Let's Play HangMan!");
    console.log("Here are the rules of the game");
    console.log("The computer will select a random word between 4 and 10 characters");
    console.log("You will input a single letter at each prompt.");
    console.log("Guess 6 letters wrong and you are dead!");
    console.log("Good Luck!");
    //calls function to generate a random word
    getWordList();
}


//function TWO
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
  console.log(randomWord);
  displayWord(randomWord);
});
}


startGame();

//displays the word length in underscores by populating
//the array that hold the guesses
function displayWord(randWord) {
    for (var i = 0; i <randWord.length; i++) {
        guessArray.push("__")
    }
    console.log("");
    console.log("Guess this word: " + guessArray);
    guessLetter(randWord);
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
        var guess = guess.charAt(0).toLowerCase();
        //call function to check randword and userGuess
        checkGuess(guess, randword)
    });
}

function checkGuess(letterGuess, wordToGuess) {
    var guessValidator = 0
    for (var j = 0; j < wordToGuess.length; j++) {
        if (wordToGuess.charAt(j) === letterGuess) {
            guessArray[j] = letterGuess;
            guessValidator +=1;
            wordValidator += 1
        }
    }
    
    if (guessValidator === 0) {
        guessCounter += 1;
        if (guessCounter < 6) {
            console.log("Oh no! You are one step closer to death!");
            console.log("you have " + (6-guessCounter) + " guesses left!")
            //call guess again function
            guessLetter(wordToGuess);
        }
        else {//call loose function
        console.log("YOU LOOSE!");
        console.log(guessArray);
        }
    } 
    
    if (guessValidator > 0) {
        if (wordValidator < wordToGuess.length) {
            console.log("Good Guess!")
            console.log(guessArray);
            guessLetter(wordToGuess);
        }
        else {
        //call win function!
        console.log("YOU WIN!");
        console.log(guessArray);
        }
    }
}

//continue until guessValidator = wordToGuess.length or
//tries > 9