window.onload = function() {

    // document get by ID variables
    var displayWord = document.getElementById("displayWord");
    var displayLives = document.getElementById("lives");
    var displayGuesses = document.getElementById("guessedWords");
    var displayNewGame = document.getElementById("newGame");

    // game progress variables keep track of solved letters
    var dash = 0;
    var letters = 0;
    //array of words
    var words = ["overwatch", "league of legends", "runescape", "heroes of the storm", "world of warcraft", "hearthstone", "rocket league", "playerunknowns battleground"];
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    function newGame() {
        // reset score
        var lives = 9;
        displayLives.innerHTML = lives;

        // GATHER USER GUESS AND DISPLAY
        var storedGuess = "";
        var arrayGuess = [];
        displayGuesses.innerHTML = arrayGuess;

        // game progress variables keep track of solved letters
        var dash = 0;
        var letters = 0;

        // pick random item from array
        var chosenWord = words[Math.floor(Math.random() * words.length)];
        console.log(chosenWord);

        //display random word in document as blank spaces
        var splitWord = chosenWord.split('');
        console.log(splitWord);
        var arrayOfBlanks = splitWord.map(function(val) {
            if (val != " ") {
                return "_";
            } else {
                dash++;
                return "-";
            }
        });
        // join the blanks back together into a string to display on the page
        var stringOfBlanks = arrayOfBlanks.join('');
        // place word blanks on page
        displayWord.innerHTML = stringOfBlanks;

        // keyup function
        document.onkeyup = function checkKey() {
            var keyPress = event.keyCode
            storedGuess = String.fromCharCode(keyPress).toLowerCase();

            // IF STATEMENT TO CHECK IF GUESS IS A LETTER
            if (alphabet.indexOf(storedGuess) !== -1 && arrayGuess.indexOf(storedGuess) === -1) {
                arrayGuess.push(storedGuess);
                displayGuesses.innerHTML = arrayGuess;
                console.log(arrayGuess);
                // IF STATEMENT TO SEE IF GUESS MATCHES WORD
                for (var i = 0; i < splitWord.length; i++) {
                    if (storedGuess == splitWord[i].toLowerCase()) {
                        arrayOfBlanks[i] = storedGuess;
                        displayWord.innerHTML = arrayOfBlanks.join('').toUpperCase();
                        letters++;
                        console.log(letters);
                        // TO WIN
                        if (letters + dash === chosenWord.length) {
                            displayLives.innerHTML = "YOU WON";
                            displayNewGame.innerHTML = 'PRESS "ENTER" TO CONTINUE';
                            document.onkeyup = false;
                            document.onkeyup = function() {
                                if (event.key === "Enter") {
                                    newGame();
                                    displayNewGame.style.visibility = "hidden";
                                }
                            } // Reset the game
                        } // END WIN CONDITION
                    } // END IF MATCH 
                } // END MATCH LOOP

                // DECREASING LIVES IF WRONG GUESS
                if (chosenWord.indexOf(storedGuess) === -1) {
                    lives -= 1;
                    displayLives.innerHTML = lives;
                    if (lives <= 0) {
                        displayLives.innerHTML = "YOU LOST";
                        displayNewGame.innerHTML = 'PRESS "ENTER" TO CONTINUE';
                        displayNewGame.style.visibility = "visible";
                        document.onkeyup = false;
                        document.onkeyup = function() {
                            if (event.key === "Enter") {
                                newGame();
                                displayNewGame.style.visibility = "hidden";
                            }
                        } // Reset the game
                    } // End of lose condition
                } // END DECREASE LIVES
            } // END OF ALPHABET CHECK 
        } // end of onkeyup function
    } // end newGame();
    newGame();
} //end of page ready