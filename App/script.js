const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector(
    "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const winningButton = document.querySelector("[data-winning-message-button]");

let isCircleTurn;

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkForWin(currentPlayer) {
    return winningCombination.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
}

function checkForDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains("x") || cell.classList.contains("circle")
    })
}

function startGame() {
    for (const cell of cellElements) {
        cell.classList.remove("x");
        cell.classList.remove("circle");
        board.classList.remove("x");
        board.classList.remove("circle");


        cell.addEventListener("click", handleClick, { once: true });
    }

    isCircleTurn = false;

    board.classList.add("x");
    winningMessage.classList.remove("show-winning-message");
}

function endGame(isDraw) {
    if (isDraw) {
        winningMessageTextElement.innerText = `Empate!`;
    } else {
        winningMessageTextElement.innerText = isCircleTurn
            ? "Circulo venceu!"
            : "X Venceu!";
    }

    winningMessage.classList.add("show-winning-message");
}

function placeMark(cell, classToAdd) {
    cell.classList.add(classToAdd);
}

function swapTurns() {
    isCircleTurn = !isCircleTurn;

    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
}

function handleClick(e) {
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    const isDraw = checkForDraw()

    const isWin = checkForWin(classToAdd);
    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true)
    } else {
        swapTurns();
    }

}

startGame();

winningButton.addEventListener("click", function() {
    startGame()
    console.log("clico")
});
