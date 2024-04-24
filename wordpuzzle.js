// Array von Wörtern für das Spiel
var words = ["HFU", "Pepper", "Robotik"];

// Zufälliges Wort auswählen
var selectedWord = words[Math.floor(Math.random() * words.length)];

// Zu erratendes Wort als Array von Buchstaben
var wordToGuess = selectedWord.split('');

// Verdecktes Wort mit Platzhaltern initialisieren
var displayWord = Array(wordToGuess.length).fill('_');

// Funktion zum Anzeigen des aktuellen Spielstands
function updateDisplay() {
    document.getElementById('word-display').innerText = displayWord.join(' ');
}

// Funktion zum Überprüfen des eingegebenen Wortes
function checkGuess() {
    var guess = document.getElementById('guess-input').value.toUpperCase();
    if (guess === selectedWord) {
        alert("Glückwunsch! Du hast das richtige Wort erraten!");
        resetGame(); // Spiel zurücksetzen, um ein neues Wort zu wählen
    } else {
        alert("Falsche Vermutung. Versuche es erneut!");
        // Optional: Clear the input field to allow the user to make another guess
        document.getElementById('guess-input').value = '';
    }
}


// Funktion zum Zurücksetzen des Spiels
function resetGame() {
    // Zufälliges Wort auswählen
    selectedWord = words[Math.floor(Math.random() * words.length)];
    wordToGuess = selectedWord.split('');
    displayWord = Array(wordToGuess.length).fill('_');
    updateDisplay();
    document.getElementById('guess-input').value = '';
}

// Spiel initialisieren
updateDisplay();
