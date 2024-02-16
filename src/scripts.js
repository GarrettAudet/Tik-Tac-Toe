// Player factory function to create Players X and O
const Player = (sign) => {
    const getSign = () => sign;
    return { getSign }
}

// Game board module to manage game state
const gameBoard = (() => {
    const board = new Array(9).fill('_');
    
    const getField = (num) => board[num];
    const setField = (position, player) => {
        if (isValidMove(position)) {
            board[position] = player;
            return true;
        }
        return false; 
    }

    const reset = () => {
        for (let i=0; i < board.length; i++) {
            board[i] = '_'
        }
    }

    const isValidMove = (position) => {
        return board[position] === '_';
    } 

    const checkWin = (player) => {
        const sign = player.getSign();
        const winningCombinations = [
            [0,1,2],[3,4,5],[6,7,8], // Rows
            [0,3,6],[1,4,7],[2,5,8], // Columns
            [0,4,8],[2,4,6]          // Diagonals 
        ];

        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] == sign;
            });
        });
    }

    return {getField, setField, reset, checkWin, board}
})();

// Display Controller to manage UI updates
const displayController = (() => {
    const fieldElements = document.querySelectorAll(".game-board-field");
    const gameResultElement = document.querySelector('.game-status');
    const buttonX = document.getElementById('btn-x');
    const buttonO = document.getElementById('btn-o');
    let eventListenerEnabled = true;

    const fieldClickHandler = (index) => {
        if (eventListenerEnabled) {
            gameController.playRound(index);
        }
    }

    const updateGameBoard = () => {
        fieldElements.forEach((field,index) => {
            const cellValue = gameBoard.getField(index);
            field.textContent = cellValue === '_' ? '' : cellValue;
        })
    };

    fieldElements.forEach((field, index) => {
        field.addEventListener("click", () => {
            fieldClickHandler(index);
            console.log('test')
        });
    });

    const displayResult = (message) => {
        gameResultElement.textContent = message;
    };

    const disableEventListener = () => {
        eventListenerEnabled = false;
    };

    const enableEventListener = () => {
        eventListenerEnabled = true;
    };

    const toggleButton = (button) => {
        if (button === "O") {
            buttonO.classList.toggle('selected');
            buttonX.classList.toggle('selected');
            return
        } 
        buttonX.classList.toggle('selected');
        buttonO.classList.toggle('selected');
        if (button === 'R') {
            buttonX.classList.add('selected');
            buttonO.classList.remove('selected');
        }
    }

    return { updateGameBoard, displayResult, toggleButton, enableEventListener, disableEventListener }
})();

// Game controller to handle game logic
const gameController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let currentPlayer = playerX; // Start with player X
    let moveCount = 0;

    // Returns the sign ('X' or 'O') of the current player
    const getCurrentPlayerSign = () => currentPlayer.getSign();

    const playRound = (index) => {
        // Attempt to set the field; if successful, update the board and check game status
        if (gameBoard.setField(index, getCurrentPlayerSign())) {
            moveCount++;
            displayController.updateGameBoard();
            checkGameStatus();
            displayController.toggleButton(currentPlayer.getSign());
            // Switch the current player for the next turn
            currentPlayer = currentPlayer === playerX ? playerO : playerX;
        }
    };

    const checkGameStatus = () => {
        // Check for a win or a tie, and update the game result display accordingly
        if (gameBoard.checkWin(currentPlayer)) {
            displayController.displayResult(`Player ${getCurrentPlayerSign()} Wins!`);
            displayController.disableEventListener();
            return;
        }
        if (moveCount >= 9) {
            displayController.displayResult("It's a Tie!");
            displayController.disableEventListener();
            return;
        }
    };

    const resetGame = () => {
        gameBoard.reset();
        currentPlayer = playerX; // Reset to player X for the new game
        moveCount = 0;
        displayController.displayResult("Tic-Tak-Toe"); // Clear the result display
        displayController.updateGameBoard();
        displayController.enableEventListener();
        displayController.toggleButton("R");
    };

    return { playRound, resetGame, getCurrentPlayerSign, checkGameStatus };
})();

document.addEventListener('DOMContentLoaded', () => {
    const gameResultElement = document.querySelector('.game-result');

    if (gameResultElement) {
        gameResultElement.addEventListener("click", gameController.resetGame);
    } else {
        console.error("The game result element was not found.");
    }

    displayController.updateGameBoard(); // Assuming displayController is correctly initialized before this line
});