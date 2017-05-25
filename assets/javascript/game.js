// Global Variables

// Array with all possible cities to be chosen
var cities = ["beijing", "london", "moscow", "orlando", "paris", "rome", "sydney", "tokyo"];

// Variable to store the chosen city to be played in each round
var cityInPlay = null;

// Array with each letter that forms the chosen city
var cityLetters = [];

// letter guessed by the user by pressing the keyboard buttons
var letterGuessed = null;

// Array with all wrong letters guessed by user
var guessedLetters = [];

// Array with all correct letters guessed by user
var matchedLetters = [];

// create a variable to store the cityInPLay word in a string
var wordView = "";

// Number of wrong guesses left
var guessesLeft = 10;

// Number of games the user won
var wins = 0;

// Number of games the user lost
var losses = 0;

// Register keyboard input from user
document.onkeyup = function(event) {

	// register key pressed by user 
	// and store it in the letterGuessed variable
	letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();

	// console log the letter key pressed
	console.log(letterGuessed);

	// if the letter guessed by user is right
	// and NOT already in the matched letters array
	if ((cityLetters.indexOf(letterGuessed) != -1) && (matchedLetters.indexOf(letterGuessed) == -1)){ 

		// call the function to update right guesses
		correctUpdate();

	} else {
		// if not, call the function to update wrong guesses
		wrongUpdate();

	}

}

// Set Up game - randomly choose city and split the word letters
function setupGame() {

	// Randomly choose 1 city from the cities array 
	// and store it in the cityInPlay variable
	cityInPlay = cities[Math.floor(Math.random() * cities.length)];

	// Console log chosen city - cityinPlay variable
	console.log(cityInPlay);

	// Split the letters from chosen city
	// and store in in the cityLetters Array
	cityLetters = cityInPlay.split('');

	// Console log cityLetters array 
	console.log(cityLetters);

	// call the displayCity function to move the game on
	displayCity();

	// print the Wrong Guesses Left current no. to page
	document.querySelector('#guesses').innerHTML = guessesLeft;

	// print number of wins
	document.querySelector('#wins').innerHTML = wins;

	// print number of losses
	document.querySelector('#losses').innerHTML = losses;

}

// Display random city on page with dashes to be filled in
function displayCity () {

	// loop through the cityLetters array
	for (var i=0; i < cityLetters.length; i++){

			// if the cityLetter is in the matchedLetters array
			if (matchedLetters.indexOf(cityLetters[i]) != -1){
				// add the cityLetter to the wordView string
				wordView += cityLetters[i];			
			} else {
				// if not, print the dashes to be filled in
				wordView += '&nbsp;_&nbsp;';
			}
	}

	// print the vordView string variable to the page
	document.querySelector('#city').innerHTML = wordView;

}

// Update Wrong Guesses
function wrongUpdate () {

	// if the letter guessed by the user
	// is NOT in the already guessed letters array
	// and is a wrong guess - not part of the city word
	if ((guessedLetters.indexOf(letterGuessed) == -1) && (cityLetters.indexOf(letterGuessed) == -1)){

		// decrease the numer of guesses left by one
		guessesLeft--;

		// put the letter in the already guessed array
		guessedLetters.push(letterGuessed);

		// print the updated no. of guesses left to page
		document.querySelector('#guesses').innerHTML = guessesLeft;

		// print the already guessed letter to page
		document.querySelector("#letters-guessed").innerHTML = guessedLetters.join(' - ').toUpperCase();
	}


	// End game if user gets the word right (win) or runs out of guesses (loss)
	if (guessesLeft == 0) {
			youLose();
	 } 	else if (matchedLetters.length == cityLetters.length) {
			youWin();
	}

}

// Update correct guesses
function correctUpdate () {

	// loop through the array of letters of the City in play
	for (var i = 0; i < cityLetters.length; i++) {

			// if the letter guessed by the user
			// is equal to any of the city Letters
			// and is NOT already in the matched letters array
			if ((letterGuessed === cityLetters[i]) && (matchedLetters.indexOf(letterGuessed) == -1)){

				// insert the letter into the matched letters array
				matchedLetters.push(letterGuessed);}

				// checking if there are duplicate letters in word
			else if ((letterGuessed === cityLetters[i + 1])) {

				matchedLetters.push(letterGuessed);
			};
	}

	// call the function to update the city display on page
	displayUpdate();

	// console log the array with all already matched letters
	console.log(matchedLetters);

	// End game if user gets the word right (win) or runs out of guesses (loss)
	if (guessesLeft == 0) {
			youLose();
	 } 	else if (matchedLetters.length == cityLetters.length) {
			youWin();
	}

}

// Update the city display on page
function displayUpdate () {

			// set the wordView to display the updates
			var wordView = "";

			// loop through the cityLetters array
			for (var i=0; i < cityLetters.length; i++){

			// if the cityLetter is in the matchedLetters array
			if (matchedLetters.indexOf(cityLetters[i]) != -1){
				// add the cityLetter to the wordView string
				wordView += cityLetters[i];			
			} else {
				// if not, print the dashes to be filled in
				wordView += '&nbsp;_&nbsp;';
			}
		}

		// print the updated wordView string to the page
		document.querySelector("#city").innerHTML = wordView;

}

// Function to end game when user wins
function youWin () {

	// increase the Wins score by one
	wins++;

	// print the "YOU WIN" phrase to the page
	document.querySelector("#news").innerHTML = "<h3><font color='blue'>YOU WIN!</font></h3>";

	// print the city image to the page
	document.querySelector('#picture').innerHTML = '<img src="assets/images/' + cityInPlay + '.jpg" width="340" height="190">';

	// Update the Wins score on the page
	document.querySelector("#wins").innerHTML = wins;

	// print Play Again Title
	document.querySelector("#start-play").innerHTML = "<h4>Press any key to play again!</h4>";

	document.onkeyup = function(event) {
		restartGame();
	}

}

// Function to end the game when user loses 
function youLose() {

	// increase the Loss score by one
	losses++;

	// print the "YOU LOSE" phrase to the page
	document.querySelector("#news").innerHTML = "<h3><font color='red'>YOU LOSE!<p>TRY AGAIN</font></h3>";

	// Update the Loss score on the page
	document.querySelector("#losses").innerHTML = losses;

	// print Play Again Title
	document.querySelector("#start-play").innerHTML = "<h4>Press any key to play again!</h4>";

}

function restartGame() {

	cityInPlay = null;
	cityLetters = [];
	matchedLetters = [];
	guessedLetters = [];
	guessesLeft = 10;
	letterGuessed = null;
	wins = wins;
	losses = losses;

	// call the displayCity function to move the game on
	setupGame();

	// print the Wrong Guesses Left current no. to page
	document.querySelector('#guesses').innerHTML = guessesLeft;

	// print number of wins
	document.querySelector('#wins').innerHTML = wins;

	// print number of losses
	document.querySelector('#losses').innerHTML = losses;

}

// call function to Setup Game
setupGame();