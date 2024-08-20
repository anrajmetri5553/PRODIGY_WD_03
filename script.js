const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetGame');
let currentPlayer = 'X'; // 'X' starts the game
let boardState = Array(9).fill(null); // Tracks the state of the board
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    return winningPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (boardState[index] || checkWin()) return; // Prevent clicking if cell is occupied or game has ended

    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
        return;
    }

    if (!boardState.includes(null)) {
        setTimeout(() => alert("It's a draw!"), 100);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    if (currentPlayer === 'O') aiMove(); // AI move
}

function aiMove() {
    const availableCells = boardState
        .map((value, idx) => value === null ? idx : null)
        .filter(value => value !== null);

    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    boardState[randomCell] = 'O';
    cells[randomCell].textContent = 'O';

    if (checkWin()) {
        setTimeout(() => alert('O wins!'), 100);
    } else if (!boardState.includes(null)) {
        setTimeout(() => alert("It's a draw!"), 100);
    } else {
        currentPlayer = 'X'; // Switch back to player X
    }
}

function resetGame() {
    boardState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
