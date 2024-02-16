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
        console.log('setField triggered')
        if (isValidMove(position)) {
            console.log('True')
            board[position] = player;
            return true;
        }
        console.log('False')
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

    const updateGameBoard = () => {
        fieldElements.forEach((field,index) => {
            const cellValue = gameBoard.getField(index);
            field.textContent = cellValue === '_' ? '' : cellValue;
        })
    };

    fieldElements.forEach((field, index) => {
        field.addEventListener("click", () => {
            gameController.playRound(index);
        });
    });

    const displayResult = (message) => {
        gameResultElement.textContent = message;
    };

    return { updateGameBoard, displayResult }
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
        console.log('playRound Triggered')
        // Attempt to set the field; if successful, update the board and check game status
        if (gameBoard.setField(index, getCurrentPlayerSign())) {
            console.log('playRound condition passed')
            moveCount++;
            displayController.updateGameBoard();
            checkGameStatus();
            // Switch the current player for the next turn
            console.log('test')
            currentPlayer = currentPlayer === playerX ? playerO : playerX;
        }
    };

    const checkGameStatus = () => {
        console.log('test')
        // Check for a win or a tie, and update the game result display accordingly
        if (gameBoard.checkWin(currentPlayer)) {
            displayController.displayResult(`Player ${getCurrentPlayerSign()} Wins!`);
            return;
        }
        if (moveCount >= 9) {
            displayController.displayResult("It's a Tie!");
            return;
        }
    };

    const resetGame = () => {
        gameBoard.reset();
        currentPlayer = playerX; // Reset to player X for the new game
        moveCount = 0;
        displayController.updateGameBoard();
        displayController.displayResult("Tic-Tak-Toe"); // Clear the result display
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