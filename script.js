let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (gameOver || gameBoard[index] !== '') return;

        gameBoard[index] = currentPlayer;
        const img = document.createElement('img');
        img.src = `images/${currentPlayer}.png`;
        img.alt = currentPlayer === 'X' ? 'Крестик' : 'Нолик';
        cell.innerHTML = '';
        cell.appendChild(img);

		//Удалить серый
		let delInd = gameBoard.indexOf('D');
		if(delInd != -1){
			gameBoard[delInd] = '';
			document.getElementById('cell-'+delInd).innerHTML = '';
		}
	
        checkWin();
		 if (gameOver) return;
		currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
		
		//Подготовить к удалению
		let gameBoardStr = gameBoard.join().match(new RegExp(`${currentPlayer}`, "g"));
		if(gameBoardStr != null && gameBoardStr.length  == 3){
			let ind = getRandomCell(currentPlayer);
			gameBoard[ind] = 'D';
			document.getElementById('cell-'+ind).innerHTML = '';
			const img = document.createElement('img');
			img.src = `images/${currentPlayer}dell.png`;
			document.getElementById('cell-'+ind).appendChild(img);
		}
        
        document.getElementById('turn').textContent = `Ходит ${currentPlayer}`;
    });
});

document.getElementById('reset-button').addEventListener('click', resetGame);

function getRandomCell(neededItem) {
	let item = '';
	let neededIndex = -1;
	while(neededItem != item){
		neededIndex = Math.floor(Math.random()*gameBoard.length);
		item = gameBoard[neededIndex];
	}
	return neededIndex;
}
function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winConditions) {
        if (gameBoard[condition[0]] === gameBoard[condition[1]] && gameBoard[condition[1]] === gameBoard[condition[2]] && gameBoard[condition[0]] !== '') {
            gameOver = true;
            document.getElementById('turn').textContent = `Победил ${currentPlayer === 'X' ? 'Крестик' : 'Нолик'}`;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameOver = true;
        alert('Ничья!');
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
    document.getElementById('turn').textContent = 'Ходит X';
}