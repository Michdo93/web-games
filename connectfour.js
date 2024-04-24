const ROWS = 6;
const COLS = 7;
const board = [];
let currentPlayer = 'rot';
let gameover = false;

// Initialize the board
function initializeBoard() {
    const boardElement = document.getElementById('board');
    for (let row = 0; row < ROWS; row++) {
        board[row] = [];
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => dropPiece(col));
            boardElement.appendChild(cell);
            board[row][col] = null;
        }
    }
}

// Drop a piece in the specified column
function dropPiece(col) {
    if (gameover) return;
    const row = getLowestEmptyRow(col);
    if (row !== -1) {
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cell.classList.add(currentPlayer);
        board[row][col] = currentPlayer;
        if (checkWinner(row, col)) {
            gameover = true;
            alert(`${currentPlayer.toUpperCase()} gewinnt!`);
        } else if (checkDraw()) {
            gameover = true;
            alert("It's a draw!");
        } else {
            currentPlayer = currentPlayer === 'rot' ? 'gelb' : 'rot';
        }
    }
}

// Get the lowest empty row in the specified column
function getLowestEmptyRow(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === null) {
            return row;
        }
    }
    return -1; // Column is full
}

// Check if there is a winner
function checkWinner(row, col) {
    const directions = [
        [0, 1], [1, 0], [1, 1], [-1, 1] // right, down, diagonal right, diagonal left
    ];
    for (let [dx, dy] of directions) {
        let count = 1;
        for (let i = 1; i <= 3; i++) {
            const newRow = row + i * dy;
            const newCol = col + i * dx;
            if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS) break;
            if (board[newRow][newCol] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }
        for (let i = 1; i <= 3; i++) {
            const newRow = row - i * dy;
            const newCol = col - i * dx;
            if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS) break;
            if (board[newRow][newCol] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }
        if (count >= 4) {
            return true;
        }
    }
    return false;
}

// Check if it's a draw
function checkDraw() {
    return board.every(row => row.every(cell => cell !== null));
}

// Reset the game
function resetGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.className = 'cell';
    });
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            board[row][col] = null;
        }
    }
    currentPlayer = 'rot';
    gameover = false;
}

// Initialize the game
initializeBoard();
