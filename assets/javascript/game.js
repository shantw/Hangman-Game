         // Creating our car object.
      var hangman = {

        // Properties of our car object.
        wordToGuess: '',
        wordToGuessarr: [],
        wins: 0,
        guessCountLeft: 12,
        guessCount: 12,
        lettersGuessed: [],
        wordList: ['mcLaren','golf','passat','pagani','gmc','acura','audi','bmw','chevrolet','cadillac','chrysler','bentley','bugatti','dodge','buick','honda','nissan','lexus','kia','hyundai','fiat','peugeot','jaguar','mitsubishi','infiniti','mercedes','ferrari','lamborghini','maserati','tesla','ford','opel','porsche','toyota'],
        userGuess: [],
        status:  'new',


        // Creating the incrementwins method
        addWins: function() {

          // Adding 8 to the car's mileage.
          this.wins = this.wins + 1;
        },

        // Creating the  method
        decreaseguessCount: function() {

          // Adding 8 to the car's mileage.
          this.guessCountLeft = this.guessCountLeft - 1;
        },

        // The driveAroundWorld method adds 24,000 miles to our car, sets isWorking to false, and makes some alerts.
        appendLettersGuessed: function(letter) {
              this.lettersGuessed.push(letter);
              this.guessCountLeft--;
        },

        // The honk method alerts a honking message.
        setRandomWord: function() {
          this.wordToGuess = this.wordList[Math.floor(Math.random() * this.wordList.length)];
          this.wordToGuessarr = this.wordToGuess.split("");
        },
        initUserGuess: function () {
          for (i=0; i < this.wordToGuess.length; i++){
            this.userGuess.push('_');
          }
        },
        matchFound: function (key) {
         //var tmp = mcArray.join('~').toLowerCase()
          //var lcArray = tmp.split('~')
         if  (this.wordToGuessarr.includes(key)) {
          return true ;
        }
        else{
           return false;
         }        
        },

        updateUserGuess: function (key) {

          for (i=0; i < this.wordToGuessarr.length; i++){
              if (key === this.wordToGuessarr[i]){
                if (i===0){
                    this.userGuess[i] = key.toUpperCase();
                }
                else{
                    this.userGuess[i] = key;
                 }
              } // if
          } //loop
               
        },

        initGame: function () {
               this.guessCountLeft = this.guessCount;
               this.wordToGuessarr= [];
               this.lettersGuessed = [];
               this.userGuess =[];
               this.setRandomWord();
               this.initUserGuess();
         },

        writeStats: function () {
          console.log(hangman.wordToGuess);
          console.log(hangman.wordToGuessarr);
          console.log(hangman.wins);
          console.log(hangman.guessCountLeft);
          console.log(hangman.userGuess);
          console.log(hangman.lettersGuessed);
          console.log(hangman.newGame);
        }
      };
            
      document.getElementById("newBtn").onclick = function startGame() {
        hangman.status = 'gameover';
        newGame();
      }

     document.getElementById("resumeBtn").onclick = function resumeGame() {
        if (hangman.status==='continue'){
            newGame();
        }
      }

      function newGame() {

                hangman.initGame();
                if (hangman.status === 'gameover'){
                  hangman.wins = 0;
                }
                hangman.status ='started';
                //reset image, name of the car and the header start 
                document.getElementById("carimage").src = "./assets/images/default.jfif";
                document.getElementById("carname").innerHTML = "Car to be Guessed";
                document.getElementById("headerstart").innerHTML = "Game is in progress";
                displayResults();
        }

      function displayResults() {

            var displayWins = document.getElementById("winsValue");
            displayWins.innerHTML = hangman.wins ;

            var displayWord = document.getElementById("currentWordValue");
            displayWord.innerHTML = hangman.userGuess.join(" ") ;

            var displayGuesses = document.getElementById("guessCountValue");
            displayGuesses.innerHTML = hangman.guessCountLeft;

            var displayGuesses = document.getElementById("letterGuessedValue");
            displayGuesses.innerHTML = hangman.lettersGuessed.join(" , ");
        }
      displayResults(); 
      document.onkeyup = function(event){

      
      var pressedKey = event.key.toLowerCase();
      
       if (pressedKey === '/') {
          hangman.writeStats();
          
        }       
        else {
            if (hangman.status === 'new' || hangman.status==='continue' || hangman.status==='gameover') {
                newGame();
            }
            else if (hangman.guessCountLeft > 0 && hangman.status === 'started') {
              if (!hangman.lettersGuessed.includes(pressedKey.toLowerCase())){
                  hangman.appendLettersGuessed(pressedKey);
                  displayResults(); 
                  if (hangman.matchFound(pressedKey.toLowerCase()) ) {
                      hangman.updateUserGuess(pressedKey);
                      displayResults();
                  } 

                  if (hangman.wordToGuessarr.join("").toLowerCase() === hangman.userGuess.join("").toLowerCase()){
                      hangman.addWins();
                      document.getElementById("carimage").src = "./assets/images/" + hangman.wordToGuess + '.jpg';
                      document.getElementById("carname").innerHTML = hangman.wordToGuess.toUpperCase();
                      document.getElementById("headerstart").innerHTML = "Press any key to resume the Game";
                      displayResults();
                      hangman.status = 'continue';
                  }
                  else if (hangman.guessCountLeft === 0) {
                        displayResults();
                        //hangman.status = 'new';
                        hangman.status = 'gameover';
                        document.getElementById("headerstart").innerHTML = "Press any key to start a New Game";
                        alert('You lose!');
                  }                                          
              }  
            }
          }

         

      } // onclick