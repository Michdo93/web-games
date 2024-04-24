// Generate a random number between 1 and 100
var secretNumber = Math.floor(Math.random() * 100) + 1;
var attempts = 0;

// Function to check the user's guess
function checkGuess() {
    var guess = parseInt(document.getElementById('guess-input').value);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        setMessage("Please enter a valid number between 1 and 100.");
        return;
    }
    attempts++;
    if (guess === secretNumber) {
        setMessage("Congratulations! You guessed the correct number in " + attempts + " attempts.", "green");
        setTimeout(resetGame, 3000); // Reset game after 3 seconds
    } else if (guess < secretNumber) {
        setMessage("Try a higher number.", "blue");
    } else {
        setMessage("Try a lower number.", "blue");
    }
    document.getElementById('guess-input').value = ''; // Clear input field after each guess
}

// Function to set message
function setMessage(message, color) {
    document.getElementById('message').style.color = color || "black";
    document.getElementById('message').textContent = message;
}

// Function to reset the game
function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1; // Generate new secret number
    attempts = 0;
    setMessage(""); // Clear message
}
