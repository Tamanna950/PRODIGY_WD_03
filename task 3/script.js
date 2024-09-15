let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; // X always starts first
let isGameActive = true;
let playAgainstAI = false; // Toggle for AI mode
const statusDisplay = document.getElementById('gameStatus');

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Helper functions
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        isGameActive = false;
        return;
    }

    let roundDraw = !gameBoard.includes('');
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        isGameActive = false;
        return;
    }

    handlePlayerChange();
    if (playAgainstAI && currentPlayer === 'O') {
        setTimeout(() => {
            aiMove();
        }, 500); // Simulates AI thinking delay
    }
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameBoard[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    isGameActive = true;
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
}

// Basic AI logic: Randomly selects an available cell
function aiMove() {
    if (!isGameActive) return;

    let availableCells = [];
    gameBoard.forEach((cell, index) => {
        if (cell === '') {
            availableCells.push(index);
        }
    });

    if (availableCells.length > 0) {
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        const aiCell = document.querySelector(`.cell[data-index='${randomIndex}']`);
        handleCellPlayed(aiCell, randomIndex);
        handleResultValidation();
    }
}

// Button and Event Listeners
document.getElementById('two-player-btn').addEventListener('click', function() {
    playAgainstAI = false;
    handleRestartGame();
});

document.getElementById('ai-player-btn').addEventListener('click', function() {
    playAgainstAI = true;
    handleRestartGame();
});

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('resetButton').addEventListener('click', handleRestartGame);

  
