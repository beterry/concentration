let flipCount = 0;
let moveCount = 0;
let matched = 0;
let time;
let minute = 0;
let sec = 00;
let initArray = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

const gameBoard = document.getElementById('game-board');
const intro = document.getElementById('intro');
const gridContainer = document.getElementById('grid-container');
const movesStat = document.getElementById('moves');
const timeStat = document.getElementById('time');
const matchedStat = document.getElementById('matched');
const starsStat = document.getElementById('stars');
const endOverlay = document.getElementById('end-overlay');
const endStats = document.getElementById('end-stats');
const endList = document.getElementById('end-list');

let flippedCard1;
let flippedCard2;

function reset(){
  flipCount = 0;
  moveCount = 0;
  matched = 0;
  minute = 0;
  sec = 00;
  flippedCard1 = null;
  flippedCard2 = null;
  clearInterval(time);
  //when start is clicked, reveal gameboard
  if (gameBoard.classList.contains('hidden')){
    gameBoard.classList.toggle('hidden');
    intro.classList.add('hidden');
  }
  while (starsStat.hasChildNodes()) {
    const star = starsStat.querySelector('img');
    starsStat.removeChild(star);
    console.log('star was smothered');
  }
  deleteCards();
  updateStats();
  initStars(5,starsStat);
  //shuffles initial array to provide randomness
  shuffleArray(initArray);
  //creates card elements
  for (let i = 1; i<=16; i++){
    createCard(i, initArray[i-1]);
  }
  if (endOverlay.classList.contains('hidden') == false) {
    endOverlay.classList.toggle('hidden');
    endStats.classList.toggle('hidden');
  }
  //starts timer
  startTimer();
}

//appends a card to the grid container
function createCard(cardNumber, iconNumber){
  const newCard = document.createElement('div');
  const newOverlay = document.createElement('div');
  const newIcon = document.createElement('img');
  newCard.id = "card" + cardNumber;
  newCard.classList.add('card', 'white-background');
  newOverlay.classList.add('card-overlay', 'gradient-background');
  newIcon.src= "img/dino"+iconNumber+".png";
  newIcon.classList.add('icon');
  newCard.appendChild(newIcon);
  newCard.appendChild(newOverlay);
  gridContainer.appendChild(newCard);
//listens for click event
gridContainer.addEventListener('click', flip);
}

function deleteCards(){
  while (gridContainer.hasChildNodes()) {
    const firstCard = gridContainer.querySelector('.card');
    gridContainer.removeChild(firstCard);
  }
}

function startTimer(){
  timeStat.textContent = "TIME: "+minute+":0"+sec;
  time = setInterval(timer,1000);
}

function timer(){
  if (sec < 9){
    timeStat.textContent = "TIME: "+minute+":0"+sec;
  }else{
    timeStat.textContent = "TIME: "+minute+":"+sec;
  }
  sec++;
  if (sec == 60){
    minute++
    sec = 00;
  }
}

function updateStats(){
  movesStat.textContent = "MOVES: "+moveCount;
  matchedStat.textContent = "MATCHED: "+matched;
  console.log('stats were updated');
}

function flip(card){
  //makes sure the user is not rapidly clicking
  if (flipCount == 2){
    return;
  }
  //makes sure user is clicking on a card
  if (card.target.nodeName === 'DIV'){
    //does not work on already flipped cards
    if (card.target.classList.contains('card-overlay')){
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
        //flipCount is increased to 2 so the listener is locked for a second
        flipCount++;
        flippedCard2=card.target.parentElement;
        //compares the icons
        if (flippedCard1.querySelector('img').src == flippedCard2.querySelector('img').src){
          match();
        }else{
          //waits half a second to flip the cards back over
          setTimeout(noMatch,500);
        }
      }
    }
  }
}

function match(){
  console.log('match');
  //increase matched variable
  matched++;
  //if matched equals 8 end the game
  if (matched == 8){
    endGame();
    return;
  }else{
    //the cards stay turned over (dont toggle class again)
    //background is turned green
    flippedCard1.classList.toggle('green-background');
    flippedCard2.classList.toggle('green-background');
    flippedCard1.classList.toggle('white-background');
    flippedCard2.classList.toggle('white-background');
    //increse moveCount
    moveCount++;
    updateStats();
    //resets flipCount so more cards can flip
    flipCount = 0;
  }
}

function noMatch(){
  console.log('no match');
  //the cards flip back over (toggle class again)
  flippedCard1.querySelector('.card-overlay').classList.toggle('flipped');
  flippedCard2.querySelector('.card-overlay').classList.toggle('flipped');
  //increses moveCount
  moveCount++;
  updateStars();
  updateStats();
  //resets flipCount so more cards can flip
  flipCount = 0;
}

//creates a specified number of stars and appends them to a specifies parent
function initStars(num,parent){
  for (let i = 0; i < num; i++){
    const star = document.createElement('img');
    star.classList.add('inline');
    star.src = "img/star.png";
    parent.appendChild(star);
    console.log('star was born')
  }
}

//checks to see if stars need to be decreased
function updateStars(){
  //decrease star by one
  const star = starsStat.querySelector('img');
  if (moveCount == 12 || moveCount == 18 || moveCount == 25 || moveCount == 36){
    starsStat.removeChild(star);
  }
}

function endGame(){
  clearInterval(time);
  //Reveal overlay and final stats
  endOverlay.classList.toggle('hidden');
  endStats.classList.toggle('hidden');
  //create final stats
  const endStars = document.createElement('li');
  if (moveCount<12){
      initStars(5,endStars);
  }
  if (moveCount>12 && moveCount<=18){
      initStars(4,endStars);
  }
  if (moveCount>18 && moveCount<=25){
      initStars(3,endStars);
  }
  if (moveCount>25 && moveCount<=36){
      initStars(2,endStars);
  }
  if (moveCount>36){
      initStars(1,endStars);
  }
  const endMoves = document.createElement('li');
  endMoves.textContent = "MOVES: "+moveCount;
  const endTime = document.createElement('li');
  if (sec < 9){
    endTime.textContent = "TIME: "+minute+":0"+sec;
  }else{
    endTime.textContent = "TIME: "+minute+":"+sec;
  }
  console.log('yah fucking won!!');
  endList.appendChild(endStars);
  endList.appendChild(endMoves);
  endList.appendChild(endTime);
  //show winning message and game stats
  //ends timer
}

//Shuffle initArray to provide random distribution
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
