const flipCount = 0;
const moveCount = 0;
const timer = 0;
const stars = 5;


initializeGame(){
  //creates card elements
  //assign location to cards randomly
  //starts timer
}

function flip(){
  //listens for click event
  //reveals the hidden side of the cards by toggling class
  //does not work on already flipped cards
  //if the flipCount equals 2 --> match() or noMatch()
  //if flip count equals 1 --> store id in variable
}

function match(){
  //the cards stay turned over (dont toggle class again)
  //resets flipCount
  //increased matched variable
  //increses moveCount
  //if matched equals 8 --> endGame()
}

function noMatch(){
  //the cards flip back over (toggle class again)
  //increses moveCount
  //resets flipCount
  //decreaseStars()
}

function decreaseStars(){
  //decrease star by one
}

function endGame(){
  //show winning message and game stats
  //ends timer
}
