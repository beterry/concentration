const flipCount = 0;
const moveCount = 0;
const timer = 0;
const stars = 5;
let initArray = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
const gridContainer = document.getElementById('grid-container');
const startButton = document.getElementById('start-button');

startButton.textContent = "START";

function reset(){
  //shuffles initial array to provide randomness
  shuffleArray(initArray);
  //creates card elements
  for (let i = 1; i<16; i++){
    createCard(i, initArray[i]);
  }
  //para assign card number and random icon
  function createCard(cardNumber, iconNumber){
    const newCard = document.createElement('div');
    const newOverlay = document.createElement('div');
    const newIcon = document.createElement('img');
    newCard.id = "card" + cardNumber;
    newCard.classList.add('card', 'background-color');
    newOverlay.classList.add('card-overlay', 'green-background');
    newIcon.src= "img/dino"+iconNumber+".png";
    newIcon.classList.add('icon');
    newCard.appendChild(newIcon);
    newCard.appendChild(newOverlay);
    gridContainer.appendChild(newCard);
  }
  //listens for click event
  gridContainer.addEventListener('click', flip);
  //sets 'start' button to 'reset'
  startButton.textContent = "RESET";
  //assign location to cards randomly
  //starts timer
}

function flip(card){
  if (card.target.nodeName === 'DIV'){
    if (card.target.classList.contains('card-overlay')){
      console.log('face down card was clicked');
      //reveals the hidden side of the cards by toggling class
      card.target.classList.toggle('flipped');
    } else{
      console.log('face up card was clicked');
      //turns the card back over
      card.target.querySelector('.card-overlay').classList.toggle('flipped');
    }
  }
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
