let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  loses: 0,
  ties: 0
};

updateScore();
/*
if (!score) {
  score = {
    wins : 0,
    loses : 0,
    ties : 0
  }
}
*/

function pickComputerMove() {
  randomNumber = Math.random();

  let computerMove = '';  // Global variable    

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'Rock';
  }
  else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'Paper';
  }
  else {
    computerMove = 'Scissors';
  }

  return computerMove;
}

let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-autoPlay').addEventListener('click', () => autoPlay());

document.body.addEventListener('keydown', () => {
  if (event.key === 'a') {
    autoPlay();
  }
});

function autoPlay() {
  if (!isAutoPlaying) {
    document.querySelector('.js-autoPlay').innerHTML = 'Stop';
    isAutoPlaying = true;
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
      }, 1000)
  }
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-autoPlay').innerHTML = 'Auto Play';
  }
}

document.querySelector('.js-rock-btn').addEventListener('click', () => playGame('Rock'));
document.querySelector('.js-paper-btn').addEventListener('click', () => playGame('Paper'));
document.querySelector('.js-scissors-btn').addEventListener('click', () => playGame('Scissors'));

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock');
  }
  else if (event.key === 'p') {
    playGame('Paper');
  }
  else if (event.key === 's') {
    playGame('Scissors');
  }
})

function playGame(playerMove) {
  let computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie. !!!';
    }
    else if (computerMove === 'Paper') {
      result = 'You lose. !!!';
    }
    else {
      result = 'You win. !!!';
    }
  }
  else if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You win. !!!';
    }
    else if (computerMove === 'Paper') {
      result = 'Tie. !!!';
    }
    else {
      result = 'You lose. !!!';
    }

  }
  else {
    if (computerMove === 'Rock') {
      result = 'You lose. !!!';
    }
    else if (computerMove === 'Paper') {
      result = 'You win. !!!';
    }
    else {
      result = 'Tie. !!!';
    }
  }

  if (result === 'You win. !!!') {
    score.wins += 1;
  }
  else if (result === 'You lose. !!!') {
    score.loses += 1;
  }
  else if (result === 'Tie. !!!') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScore();

  // displayResult();
  document.querySelector('.js-result').innerHTML = result;

  // checkMove(playerMove);
  // checkMove(computerMove);

  document.querySelector('.js-moves').innerHTML = `You <img src="icons/${playerMove}-emoji.png" class="move-icon"> <img src="icons/${computerMove}-emoji.png" class="move-icon"> Computer`;
}


function updateScore() {
  document.querySelector('.js-score')
    .innerHTML = `Wins : ${score.wins} Loses : ${score.loses} Ties : ${score.ties}`;
}

document.querySelector('.js-reset-score').addEventListener('click', () => resetConfirmation());

document.body.addEventListener('keydown', () => {
  if (event.key === 'n') {
    resetConfirmation();
  }
});

function resetConfirmation () {
  
  const html = `<div>
    Are you sure you want to reset score ?
    <button class="js-yes-btn">Yes</button>
    <button class="js-no-btn">No</button>
    </div>`;

  const resetElement = document.querySelector('.js-reset-confirmation');
  resetElement.innerHTML = html;

  const yesButton = document.querySelector('.js-yes-btn');
  const noButton = document.querySelector('.js-no-btn');

  yesButton.addEventListener('click', ()=> {
    resetElement.innerHTML = '';
    resetScore();
  });
  
  noButton.addEventListener('click', ()=> {
    resetElement.innerHTML = '';
  })
}

function resetScore() {
  score.wins = score.loses = score.ties = 0;
  localStorage.removeItem('score');
  updateScore();
}