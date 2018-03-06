

var program = {

//1. Create an array of words:
  letternow : "",
  

//2. Set up necessary variables:
 

 allguesses : [],
 incorrectguesses : [],
 correctguesses : [],
 underscores : [],
 
 words : ["WYVERN", "HYDRA", "YETI", "SPHINX", "CYCLOPS", "LICH","MANTICORE"],
 randomword : "",
 wordletters : [],

 letterrepeats : null,
 lettermatches : null,

 guessesleft : 16,
 loses : 0,
 wins : 0,


 


  //3. Word generator function:
  wordgenerator : function() {

  //Generate a random number:
  var randomnumber = Math.floor(Math.random()*this.words.length)
 

  //Choose a random word:

  this.randomword = this.words[randomnumber]
  

  //Split the string into an array including the individual letters of the randomly chosen word.
  this.wordletters = this.randomword.split("")
  console.log(this.randomword + " " + this.wordletters)

  //Reset game properties:
  this.allguesses = [];
  this.incorrectguesses = [];
  this.correctguesses = [];
  this.underscores = [];
  this.guessesleft = 16;

  },



  //4. Repeat checking function:
  repeatchecker : function(){


  var repeatcounter = -1;

  for (var i = 0; i < this.allguesses.length; i++) {
    if (this.letternow == this.allguesses[i]) {
        repeatcounter++;
    }
  }

  if (repeatcounter == 0) {
    this.letterrepeats = false;
  }

  else {
    this.letterrepeats = true; 
  }
  },





  //5. Match Checker to see whether the letter matches:
  matchchecker : function() {
    var matchcounter = 0;

  for (var i = 0; i < this.wordletters.length; i++) {
    if (this.letternow == this.wordletters[i]){
        matchcounter++;
    }
  }

  if (matchcounter == 0) {
    this.lettermatches = false;
  }

  else {
    this.lettermatches = true;
  }
  },





//6. Letterinput processor function:
letterinputprocessor : function(){
    
    if (this.letterrepeats == true){
        this.allguesses.pop(this.letternow);
    }
 
    if (this.letterrepeats == false && this.lettermatches == false){
        this.incorrectguesses.push(this.letternow);
        this.guessesleft--;
    }

    if (this.letterrepeats == false && this.lettermatches == true){
        this.correctguesses.push(this.letternow);
        this.guessesleft--;
    }

},







//7. Word presenter function:
wordpresenter : function(){

     
    if(this.correctguesses.length == 0) {
        for (var i = 0; i < this.wordletters.length; i++){
           this.underscores[i] = "_"; 
        }
    }

    else {
       
        for (var i = 0; i < this.wordletters.length; i++){
            
            if (this.underscores[i] != this.wordletters[i]){
                
                for (var j = 0; j < this.correctguesses.length; j++){
                    
                    if (this.correctguesses[j] == this.wordletters[i]){
                        this.underscores[i] = this.wordletters[i];
                    }

                    else{
                        this.underscores[i] = "_"
                    }

                }
            }
        }
    }

    document.getElementById("word-to-guess").innerHTML = this.underscores.join(" ");
    
    document.getElementById("wins").innerHTML = ("Wins: " + this.wins + "<br>" + "Losses: " + this.loses);

    document.getElementById("letters-guessed").innerHTML = this.incorrectguesses;
    
    document.getElementById("guessesleft").innerHTML = this.guessesleft;
},






//8. Runner function:
runner : function() {
var counter = 0;

for (var i = 0; i < this.wordletters.length; i++){
    if (this.underscores[i] == this.wordletters[i]){
        counter++;
    }
}

if (counter>0 && counter == this.wordletters.length){
    alert("You Win!");
    this.wins++;
    this.wordgenerator();
}

if (this.guessesleft == 0){
    alert("You Lose!");
    this.loses++
    this.wordgenerator();
}

}


}



var startgamefirsttime = false;


//Type in letters now and convert them into upper cases:
document.onkeyup = function(q) {
    program.letternow = String.fromCharCode(q.keyCode).toUpperCase();


//If pressing space, the user starts the game:

if (program.letternow == " " && startgamefirsttime == false) {
    
    program.wordgenerator();
    
    startgamefirsttime = true;

}



program.allguesses.push(program.letternow);
console.log("Letter Now: " + program.letternow + "\n" + "Word Letters: " + program.wordletters + "\n" + "All Guesses: " + program.allguesses);

program.repeatchecker();
program.matchchecker();
program.letterinputprocessor();

console.log("Correct Guesses: " + program.correctguesses);
console.log("Incorrect Guesses: " + program.incorrectguesses);
console.log("Guesses Left: " + program.guessesleft);

program.wordpresenter();
console.log(program.underscores);

program.runner();

}

