//A guess the number game

var guessArray = [];
var counter = 0;
var numToGuess = Math.floor((Math.random()*100) + 1);
//console.log(numToGuess);


//get the users guess and validate their input
function getGuess() {
    var prompt = require('prompt');
      prompt.start();
      prompt.get(['userInput'], function (err, result) {
        if (err) {
            console.log("There was an error " + err);
        }
        var userGuess = parseInt(result.userInput)
        if (isNaN(userGuess) || (userGuess > 100) || (userGuess < 1)) {
            console.log(result.userInput + " is not a valid guess!")
            console.log("You did not follow the rules! You can no longer play!")
            return counter = 4;
        }
        guessArray.push(userGuess);
        counter += 1
        checkGuess(userGuess);
    });
} 



//check if the user's guess is right.
function checkGuess(validGuess) {
    var highLow = ""
    //if the answer is right:
    if (validGuess === numToGuess) {
        console.log("Your guess of " + validGuess + " is right!!!! ");
        console.log("It only took you " + counter + " guess(es)!!");
        console.log("Your score is " + getScore() + " out of 100!")
        return counter = 4;
    }
    //if guess was lower set variable to lower
    else if (validGuess > numToGuess) {
        highLow = "lower";
    }
    //if not right and not lower, set to higher
    else {
        highLow = 'higher';
    }
    //check to see if they have any guesses left
    if (counter < 4) {
        console.log("Your guess of " + validGuess + " was incorrect!");
        console.log("Try a " + highLow + " number!");
        console.log("Number of guesses remaining: " + (4-counter));
        //call the get guess function again
        getGuess();
    }
    //if they are out of guesses: 
    if (counter === 4) {
        console.log("!!!!!!!!GAME OVER!!!!!!!")
        console.log("You guessed: " + guessArray);
        console.log("The correct answer was: " + numToGuess)
        console.log("Your score is " + getScore() + " out of 100!")
    }
}


//call function to start the game 
//made this function so it only displays the rules once. 
function startGame() {
    console.log("Enter a number between 1 and 100");
    console.log("You only have 4 guesses to get it right!");
    getGuess();
}

startGame();

//score function. you loose points the further away your guess is 
//from the numberTo Guess

function getScore(){
    var score = 0;
    for (var i = 0; i < guessArray.length; i++) {
        var differenceInGuess = (Math.abs(guessArray[i] - numToGuess));
        score +=differenceInGuess
    }
    return (100 - score);
}