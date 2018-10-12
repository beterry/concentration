const flipCount = 0;
const moveCount = 0;
const timer = 0;
const stars = 5;

const gridContainer = document.querySelector('#grid-container');

for (let i = 1; i<16; i++){
  createCard(i);
}

const firstCard = document.querySelector('.card');

//listens for click event
firstCard.addEventListener('click', flip);

function createCard(cardNumber){
  const newCard = document.createElement('div');
  const newOverlay = document.createElement('div');
  const newIcon = document.createElement('img');
  newCard.id = "card" + cardNumber;
  newCard.classList.add('card', 'background-color');
  newOverlay.classList.add('card-overlay', 'green-background');
  newIcon.src= "img/logo.png";
  newIcon.classList.add('icon');
  newCard.appendChild(newIcon);
  newCard.appendChild(newOverlay);
  gridContainer.appendChild(newCard);
}

function reset(){
  //sets 'start' button to 'reset'
  //creates card elements
  //assign location to cards randomly
  //starts timer
}

function flip(){
  console.log('clicked');
  //reveals the hidden side of the cards by toggling class
  firstCard.querySelector('.card-overlay').classList.toggle('flipped');
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
