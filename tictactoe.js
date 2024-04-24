// Variable to track the current player (X or O)
var currentPlayer = "X";

// Variable to track the game mode (1 for 1 Player, 2 for 2 Players)
var gameMode = 2; // Default to 2 Players

// Function to select the game mode
function selectMode(mode) {
    gameMode = mode;
    var modeBtn1 = document.getElementById("modeBtn1");
    var modeBtn2 = document.getElementById("modeBtn2");
    if (mode === 1) {
        modeBtn1.className = "but selected";
        modeBtn2.className = "but";
    } else {
        modeBtn2.className = "but selected";
        modeBtn1.className = "but";
    }
}

// Function to start the game
function startGame() {
    resetBoard(); // Reset the game board
    currentPlayer = "X"; // Reset current player to X
    if (gameMode === 1 && currentPlayer === "O") {
        // If it's the computer's turn and in 1-Player mode
        setTimeout(computerTurn, 500); // Delay computer turn for better user experience
    }
}

// Function to handle player's turn and mark the cell
function handleTurn(cellId) {
    var cell = document.getElementById(cellId);
    if (cell.value === '') {
        cell.value = currentPlayer;
        if (currentPlayer === "X") {
            currentPlayer = "O";
            if (gameMode === 1) {
                // If it's 1-Player mode, after the player's turn, let the computer play
                setTimeout(computerTurn, 500); // Delay computer turn for better user experience
            }
        } else {
            currentPlayer = "X";
        }
        // Check game status after each move
        myfunc();
    }
}

// Function to simulate the computer's turn
function computerTurn() {
    // Choose a random empty cell for the computer's move
    var emptyCells = document.querySelectorAll('.cell[value=""]');
    if (emptyCells.length > 0) {
        var randomIndex = Math.floor(Math.random() * emptyCells.length);
        var randomCell = emptyCells[randomIndex];
        randomCell.value = "O";
        currentPlayer = "X"; // Switch back to player after computer's turn
        myfunc(); // Check game status after computer's move
    }
}

// Function to reset the game board
function resetBoard() {
    var cells = document.querySelectorAll('.cell');
    for (var i = 0; i < cells.length; i++) {
        cells[i].value = ''; // Clear the cell value
    }
}

// Function to check game status
function myfunc() {
    // Winning combinations
    var winningCombos = [
        ['b1', 'b2', 'b3'],
        ['b4', 'b5', 'b6'],
        ['b7', 'b8', 'b9'],
        ['b1', 'b4', 'b7'],
        ['b2', 'b5', 'b8'],
        ['b3', 'b6', 'b9'],
        ['b1', 'b5', 'b9'],
        ['b3', 'b5', 'b7']
    ];

    // Check for a winner
    for (var i = 0; i < winningCombos.length; i++) {
        var combo = winningCombos[i];
        var cell1 = document.getElementById(combo[0]).value;
        var cell2 = document.getElementById(combo[1]).value;
        var cell3 = document.getElementById(combo[2]).value;
        if (cell1 !== '' && cell1 === cell2 && cell2 === cell3) {
            declareWinner(combo[0], combo[1], combo[2]);
            return;
        }
    }

    // Check for a tie
    var cells = document.querySelectorAll('.cell');
    var isTie = true;
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].value === '') {
            isTie = false;
            break;
        }
    }
    if (isTie) {
        document.getElementById('print').innerHTML = "Unentschieden!";
        disableAllCells();
        return;
    }

    // Update game status message
    if (currentPlayer === "X") {
        document.getElementById('print').innerHTML = "Spieler X ist dran!";
    } else {
        document.getElementById('print').innerHTML = "Spieler O ist dran!";
    }
}

// Function to declare the winner
function declareWinner(cell1, cell2, cell3) {
    document.getElementById('print').innerHTML = "Spieler " + document.getElementById(cell1).value + " hat gewonnen!";
    disableAllCells();
    highlightCells([cell1, cell2, cell3]);
}

// Function to disable all cells after a win or tie
function disableAllCells() {
    var cells = document.querySelectorAll('.cell');
    for (var i = 0; i < cells.length; i++) {
        cells[i].disabled = true;
    }
}

// Function to highlight the winning cells
function highlightCells(cells) {
    for (var i = 0; i < cells.length; i++) {
        document.getElementById(cells[i]).style.color = "red";
    }
}

// Function to reset game
function resetGame() {
    resetBoard(); // Reset the game board
    currentPlayer = "X"; // Reset current player to X
    document.getElementById('print').innerHTML = ""; // Clear game status message
    var cells = document.querySelectorAll('.cell');
    for (var i = 0; i < cells.length; i++) {
        cells[i].disabled = false; // Enable all cells
        cells[i].style.color = ""; // Reset cell color
    }
}
