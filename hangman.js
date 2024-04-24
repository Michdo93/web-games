// Wörterliste für das Spiel
var words = ["HANGMAN", "COMPUTER", "JAVASCRIPT", "DEVELOPER", "PROGRAMMING"];

// Zufälliges Wort auswählen
var selectedWord = words[Math.floor(Math.random() * words.length)];

// Zu erratendes Wort als Array von Buchstaben
var wordToGuess = selectedWord.split('');

// Verdecktes Wort mit Platzhaltern initialisieren
var displayWord = Array(wordToGuess.length).fill('_');

// Anzahl der falschen Versuche
var wrongAttempts = 0;

// Funktion zum Anzeigen des aktuellen Spielstands
function updateDisplay() {
    document.getElementById('word-display').innerText = displayWord.join(' ');
    document.getElementById('hangman').innerText = "Hangman: " + wrongAttempts + "/6";
}

// Funktion zum Überprüfen des eingegebenen Buchstabens
function handleLetter(letter) {
    // Buchstabe in Kleinbuchstaben umwandeln
    letter = letter.toUpperCase();

    // Überprüfen, ob der Buchstabe im Wort enthalten ist
    if (wordToGuess.includes(letter)) {
        // Buchstaben im Wort gefunden, anzeigen
        for (var i = 0; i < wordToGuess.length; i++) {
            if (wordToGuess[i] === letter) {
                displayWord[i] = letter;
            }
        }
    } else {
        // Buchstabe nicht im Wort gefunden, falscher Versuch
        wrongAttempts++;
    }

    // Spielstand aktualisieren
    updateDisplay();

    // Überprüfen, ob das Spiel gewonnen oder verloren wurde
    checkGameStatus();
}

// Funktion zum Überprüfen des Spielstatus (Gewonnen/Verloren)
function checkGameStatus() {
    // Überprüfen, ob das Wort vollständig erraten wurde
    if (!displayWord.includes('_')) {
        alert("Gewonnen! Das Wort war: " + selectedWord);
        resetGame();
    }
    // Überprüfen, ob zu viele falsche Versuche gemacht wurden
    else if (wrongAttempts >= 6) {
        alert("Verloren! Das richtige Wort war: " + selectedWord);
        resetGame();
    }
}

// Funktion zum Zurücksetzen des Spiels
function resetGame() {
    // Zufälliges Wort auswählen
    selectedWord = words[Math.floor(Math.random() * words.length)];
    wordToGuess = selectedWord.split('');
    displayWord = Array(wordToGuess.length).fill('_');
    wrongAttempts = 0;
    updateDisplay();
}

// Spiel initialisieren
updateDisplay();
