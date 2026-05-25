let currentPlayer = "❌";
let board = Array(9).fill(null);
let gameActive = true;

const statusDiv = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
const resetButton = document.querySelector("button");

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.dataset.index;
    if (board[index] || !gameActive) return;
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    if (checkWin()) {
      if (currentPlayer === "❌") {
        statusDiv.textContent = "¡Nohan ganó 😎!";
      } else {
        statusDiv.textContent = "¡Adry ganó 💖!";
      }
      gameActive = false;
    } else if (board.every(cell => cell)) {
      statusDiv.textContent = "¡Empate! 🤝";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";
      statusDiv.textContent = `Turno de ${currentPlayer}`;
    }
  });
});

function checkWin() {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board.fill(null);
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = "❌";
  gameActive = true;
  statusDiv.textContent = "Turno de ❌";
}

resetButton.addEventListener("click", resetGame);
resetGame(); // Iniciar juego
