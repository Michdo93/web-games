document.addEventListener('DOMContentLoaded', function() {
    const choices = document.querySelectorAll('.choice');
    const result = document.getElementById('result');
    const resetButton = document.getElementById('reset');

    choices.forEach(choice => choice.addEventListener('click', playGame));
    resetButton.addEventListener('click', resetGame);

    function playGame(e) {
        const playerChoice = e.target.id;
        const computerChoice = getComputerChoice();
        const winner = getWinner(playerChoice, computerChoice);
        displayResult(winner, computerChoice);
    }

    function getComputerChoice() {
        const choices = ['Stein', 'Papier', 'Schere'];
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }

    function getWinner(player, computer) {
        if (player === computer) {
            return 'draw';
        } else if ((player === 'Stein' && computer === 'Schere') ||
                   (player === 'Papier' && computer === 'Stein') ||
                   (player === 'Schere' && computer === 'Papier')) {
            return 'player';
        } else {
            return 'computer';
        }
    }

    function displayResult(winner, computerChoice) {
        let message = '';
        if (winner === 'player') {
            message = 'Du hast gewonnen!';
        } else if (winner === 'computer') {
            message = 'Der Computer gewinnt!';
        } else {
            message = 'Es ist ein untentschieden!';
        }
        result.textContent = `${message} Computer wählt ${computerChoice}.`;
    }

    function resetGame() {
        result.textContent = '';
    }
});
