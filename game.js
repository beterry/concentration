let flipCount = 0;
let moveCount = 0;
let matched = 0;
let timer = 0;
let stars = 5;
let initArray = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
const gridContainer = document.getElementById('grid-container');
const startButton = document.getElementById('start-button');

let flippedCard1;
let flippedCard2;

startButton.textContent = "START";

function reset(){
  //shuffles initial array to provide randomness
  shuffleArray(initArray);
  //creates card elements
  for (let i = 1; i<=16; i++){
    createCard(i, initArray[i-1]);
  }
  //appends a card to the grid container
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
  //makes sure user is clicking on a card
  if (card.target.nodeName === 'DIV'){
    //does not work on already flipped cards
    if (card.target.classList.contains('card-overlay')){
      console.log('face down card was clicked');
      //reveals the hidden side of the cards by toggling class
      card.target.classList.toggle('flipped');
      //store id in variable
      if (flipCount == 0){
        flippedCard1=card.target.parentElement;
        flipCount++;
        return;
      }
      //if a card was already flipped, check if the icons match
      if (flipCount == 1){
        flippedCard2=card.target.parentElement;
        if (flippedCard1.querySelector('img').src == flippedCard2.querySelector('img').src){
          match();
        }else{
          setTimeout(noMatch,500);
        }
      }
    }
  }
}

function match(){
  //if matched equals 8 end the game
  console.log('match');
  //increase matched variable
  matched++;
  if (matched == 8){
    endGame();
    return;
  }else{
    //the cards stay turned over (dont toggle class again)
    //resets flipCount
    flipCount = 0;
    //increse moveCount
    moveCount++;
  }
}

function noMatch(){
  console.log('no match');
  //the cards flip back over (toggle class again)
  flippedCard1.querySelector('.card-overlay').classList.toggle('flipped');
  flippedCard2.querySelector('.card-overlay').classList.toggle('flipped');
  //increses moveCount
  moveCount++;
  //resets flipCount
  flipCount = 0;
  decreaseStars();
}

function decreaseStars(){
  //decrease star by one
}

function endGame(){
  console.log('yah fucking won!!');
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
