$(document).ready(function() {
  $(".start-game-btn").click(function() {
    $(".landing-page").hide();
    $(".container").show();
  });

  let currentPlayer = "X";
  let board = ['', '', '', '', '', '', '', '', ''];

  renderBoard();

  function renderBoard() {
    const boardElement = $('#board');
    boardElement.html('');
    board.forEach((cell, index) => {
      const cellElement = $('<div class="cell"></div>');
      cellElement.text(cell);
      cellElement.click(() => handleCellClick(index));
      boardElement.append(cellElement);
    });
  }

  function handleCellClick(index) {
    if (board[index] === '') {
      board[index] = currentPlayer;
      if (checkWinner()) {
        showResult(currentPlayer + ' wins!');
        showConfetti(); // Trigger confetti immediately after showing the result
      } else if (board.every(cell => cell !== '')) {
        showResult('It\'s a draw!');
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        renderBoard();
      }
    }
  }

  function checkWinner() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    return winningCombos.some(combo => {
      if (combo.every(index => board[index] === currentPlayer)) {
        combo.forEach(index => {
          $('#board .cell').eq(index).addClass('winning-cell');
        });
        return true;
      }
    });
  }

  function showResult(message) {
    const overlay = $('<div class="overlay"></div>');
    const resultMessage = $('<div class="result-message"></div>');
    resultMessage.text(message);
    const newGameBtn = $('<button class="new-game-btn">New Game</button>');
    newGameBtn.click(function() {
      currentPlayer = 'X';
      board = ['', '', '', '', '', '', '', '', ''];
      renderBoard();
      overlay.remove(); // Remove overlay
      $('.confetti').remove(); // Remove existing confetti elements if any
    });
    overlay.append(resultMessage);
    overlay.append(newGameBtn);
    $('body').append(overlay); // Append overlay to the body element
    overlay.addClass('active'); // Show overlay
  }

  function showConfetti() {
    for (let i = 0; i < 100; i++) {
      const paper = $('<div class="confetti"></div>');
      paper.css({
        backgroundColor: randomColor(),
        left: Math.random() * 100 + 'vw',
        animationDelay: Math.random() * 3 + 's'
      });
      $('body').append(paper);
    }
  }

  function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});
function showResult(message) {
  const overlay = $('<div class="overlay"></div>');
  const resultMessage = $('<div class="result-message"></div>');
  resultMessage.text(message);
  const newGameBtn = $('<button class="new-game-btn">New Game</button>');
  newGameBtn.click(function() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    renderBoard();
    overlay.remove();
    $('.confetti').remove();
  });
  overlay.append(resultMessage);
  overlay.append(newGameBtn);
  $('body').append(overlay);
  overlay.addClass('active');
}
