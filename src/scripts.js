const gameBoard = () => {
    // Select Relevant Variables
    let gameFields = document.querySelectorAll('game-board-field');
    let currentPlayer = 'X';
    let isGameActive = true;

    // Establish New Array and Retrieve Variables
    let board = new Array(9);


}

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