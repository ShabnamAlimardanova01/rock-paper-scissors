const choices = document.querySelectorAll(".choice");

const playerScoreElement = document.querySelector("#player-score");
const computerScoreElement = document.querySelector("#computer-score");

const playerChoice = document.querySelector("#player-choice");
const compChoice = document.querySelector("#computer-choice");

const message = document.querySelector("#message");
const resetButton = document.querySelector("#reset-button");

const resultModal = document.querySelector("#result-modal");
const resultTitle = document.querySelector("#result-title");
const overlay = document.querySelector(".overlay");

const playAgainButton = document.querySelector(".play-again");
const exitGameButton = document.querySelector(".exit-game");

let playerScore = 0;
let computerScore = 0;
let round = 0;
const maxRounds = 5;

const options = ["rock", "paper", "scissors"];
const choiceIcons = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️",
};

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function checkGameOver() {
  if (round === maxRounds) {
    if (playerScore > computerScore) {
      resultTitle.textContent = "🎉 You Win!";
    } else if (playerScore < computerScore) {
      resultTitle.textContent = "💔 You Lose!";
    } else {
      resultTitle.textContent = "🤝 It's a Draw!";
    }
    resultModal.style.display = "block";
    overlay.style.display = "block";
  }
}

function playGame(playerSelection) {
  if (round >= maxRounds) return;

  const computerSelection = getComputerChoice();
  playerChoice.textContent = choiceIcons[playerSelection];
  compChoice.textContent = choiceIcons[computerSelection];

  if (playerSelection === computerSelection) {
    message.textContent = "It's a draw!";
    message.style.color = "black";
    message.classList.add('active');
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    playerScore++;
    playerScoreElement.textContent = playerScore;
    message.textContent = `You win! ${playerSelection} beats ${computerSelection}.`;
    message.style.color = "green";
    message.classList.add('active');
  } else {
    computerScore++;
    computerScoreElement.textContent = computerScore;
    message.textContent = `You lose! ${computerSelection} beats ${playerSelection}.`;
    message.style.color = "red";
    message.classList.add('active');
  }

  round++;
  checkGameOver();
}

for (let i = 0; i < choices.length; i++) {
  choices[i].addEventListener("click", function () {
    const playerSelection = choices[i].id;
    playGame(playerSelection);
  });
}

resetButton.addEventListener("click", function () {
  playerScore = 0;
  computerScore = 0;
  round = 0;

  playerChoice.textContent = "❓";
  compChoice.textContent = "❓";
  message.textContent = "Make your choice to start the game!";
  message.style.color = "#444";
  message.classList.remove('active');

  playerScoreElement.textContent = "0";
  computerScoreElement.textContent = "0";
});

playAgainButton.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  round = 0;

  playerChoice.textContent = "❓";
  compChoice.textContent = "❓";
  message.textContent = "Make your choice to start the game!";
  message.style.color = "#444";
  message.classList.remove('active');

  resultModal.style.display = "none";
  overlay.style.display = "none";

  playerScoreElement.textContent = "0";
  computerScoreElement.textContent = "0";
});

exitGameButton.addEventListener("click", () => {
  window.close();
});

