const Player = (sign) => {
    const getSign = () => sign;
    return { getSign }
}

const gameBoard = () => {
    const board = new Array(9).fill('_');
    
    const isValidMove = (position) => {
        return board[position] === '_';
    } 

    const getField = (num) => board[num];

    const makeMove = (position, player) => {
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

    const checkWin = (currentPlayer) => {
        // Check Rows for Win
        for (let i = 0; i < 9; i += 3) {
            if (board[i] === currentPlayer.getSign() && board[i + 1] === currentPlayer.getSign() && board[i + 2] === currentPlayer.getSign()) {
                return true;
            }
        }
        // Check Columns for Win
        for (let i = 0; i < 3; i++) {
            if (board[i] === currentPlayer.getSign() && board[i + 3] === currentPlayer.getSign() && board[i + 6] === currentPlayer.getSign()) {
                return true;
            }
        }
        // Check Diagonals for Win
        if ((board[0] === currentPlayer.getSign() && board[4] === currentPlayer.getSign() && board[8] === currentPlayer.getSign()) ||
            (board[2] === currentPlayer.getSign() && board[4] === currentPlayer.getSign() && board[6] === currentPlayer.getSign())) {
                return true;
        }
        return false;
    }

    return {getField, makeMove, reset}
}

function handleFieldClick(e) {
    console.log("Field Clicked");
}

const displayController = () => {
    const fieldElements = document.querySelectorAll(".game-board-field");

    fieldElements.forEach((field) => {
        field.addEventListener("click", handleFieldClick);
    }
  );
}

const gameController = () => {
    const playerX = Player("X");
    const playerO = Player("O");
    let move = 1;
    let finishedGame = false;

    const playRound = (position) => {
        gameBoard.makeMove(position, getCurrentPlayerSign());
        if (gameBoard.checkWin(getCurrentPlayerSign())) {
            console.log("The Game is Won");
            finishedGame = true;
        }
        if (move === 9) {
            console.log("The Game is a Tie");
            finishedGame = true;
        }
        move++;
    }

    const getCurrentPlayerSign = () => {
        return move % 2 === 1 ? playerX.getSign() : playerO.getSign();
    }

    const reset = () => {
        round = 1;
        finishedGame = false;
    }
}

/*
Functions to recreate: printBoard, switchPlayer, checkWin, playGame
Functions Done: initializeBoard, printBoard, isValidMove, makeMove

*/ 

// A Function to Switch Players
function switchPlayer (player) {
    console.log('variable test');
    console.log(player);
    return (player === 'X'?'O':'X');
}
























// A Function to Create an Array
function initializeBoard () {

    // Establish New Array and Retrieve Variables
    let board = new Array(9).fill('_');

    // Return Board
    return board;
}

// A Function to Print the Current Array
function printBoard(board) {
    for (let i = 0; i < board.length; i += 3) {
        console.log(board.slice(i, i + 3).join(' '));
    }
}

// A Function to Check if a Move is Valid
function isValidMove (board, position) {
    return board[position] === '_';
} 

// A Function to Make A Move
function makeMove (board, position, player) {
    if (isValidMove(board, position)) {
        board[position] = player;
        return true;
    }
    return false; 
}

// A Function to Switch Players
function switchPlayer (player) {
    console.log('variable test');
    console.log(player);
    return (player === 'X'?'O':'X');
}

// A Function to Check for a Tic-Tac-Toe Win
function checkWin(board, currentPlayer) {
    // Check Rows for Win
    for (let i = 0; i < 9; i += 3) {
        if (board[i] === currentPlayer && board[i + 1] === currentPlayer && board[i + 2] === currentPlayer) {
            return true;
        }
    }
    // Check Columns for Win
    for (let i = 0; i < 3; i++) {
        if (board[i] === currentPlayer && board[i + 3] === currentPlayer && board[i + 6] === currentPlayer) {
            return true;
        }
    }
    // Check Diagonals for Win
    if ((board[0] === currentPlayer && board[4] === currentPlayer && board[8] === currentPlayer) ||
        (board[2] === currentPlayer && board[4] === currentPlayer && board[6] === currentPlayer)) {
        return true;
    }
    return false;
}

// A Function to Play the Game
function playGame () {
    let currentPlayer = 'X'
    console.log('testing');
    console.log(currentPlayer);
    let moves = 0;

    // Create Fresh Board
    let board = initializeBoard ();

    // Loop to Play Game
    while (moves < 9) {
        console.log('Test inside while loop');
        console.log(currentPlayer);
        printBoard(board);
        let position = prompt ("Player ${currentPlayer}, enter your move (0-8):`")
        if (makeMove(board, position, currentPlayer)) {
            console.log(`Player ${currentPlayer} completed a turn`);
            moves++;
            if (checkWin(board, currentPlayer)) {
                console.log(`Player ${currentPlayer} wins!`);
                printBoard(board);
                return;
            }
            currentPlayer = switchPlayer(currentPlayer);
            console.log('test');
            console.log(currentPlayer);
        } else {
            console.log("Position taken, try again");
            printBoard(board);
        }
    }
}









// A Function that Enables a Button Toggle
function setupButtonToggle() {
    // Establish New Array and Retrieve Variables
    let buttonX = document.getElementById("btn-x")
    let buttonO = document.getElementById("btn-o")

    // Set Default Selection
    buttonX.classList.add('selected');
    
    // Toggle Selected Button
    function toggleSelection () {
        buttonX.classList.toggle('selected');
        buttonO.classList.toggle('selected');
    }

    buttonX.addEventListener('click',toggleSelection);
    buttonO.addEventListener('click',toggleSelection);
}

document.addEventListener('DOMContentLoaded', setupButtonToggle);
document.addEventListener('DOMContentLoaded', displayController);

// Select Relevant Variables
let gameFields = document.querySelectorAll('game-board-field');
let player = 'X';