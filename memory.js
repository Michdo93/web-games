const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'A', 'B', 'C', 'D', 'E', 'F'];
let moves = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

const gameContainer = document.getElementById('game-container');
const moveCounter = document.getElementById('move-counter');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    gameContainer.innerHTML = '';
    moves = 0;
    moveCounter.textContent = moves;
    lockBoard = false;

    const shuffledCards = shuffle(cards);
    shuffledCards.forEach(card => {
        const memoryCard = document.createElement('div');
        memoryCard.classList.add('card');
        memoryCard.classList.add('hidden');
        memoryCard.dataset.framework = card;
        memoryCard.textContent = card;

        memoryCard.addEventListener('click', flipCard);

        gameContainer.appendChild(memoryCard);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.classList.remove('hidden');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    updateMoves();
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.add('hidden');
        secondCard.classList.add('hidden');
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function updateMoves() {
    moves++;
    moveCounter.textContent = moves;
}

function restartGame() {
    createBoard();
}

createBoard();
