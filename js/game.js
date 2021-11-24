'use strict'

const BOARD_SIZE = 14;
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3
const HERO = '♆';
const ALIEN = '👽';
const LASER = '⤊';
const GROUND = '🧱'

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard;
var gGame = {
    isOn: false,
    aliensCount: 0,
    score: 0
}
// Called when game loads
function init() {
    gBoard = createBoard()
    renderBoard(gBoard)
    gGame.isOn = true
    gGame.score = 0
    gGame.aliensCount = 0
    closeModal()
}


// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens
function createBoard() {
    var board = []
    for (var i = 0; i < BOARD_SIZE; i++) {
        board.push([])
        for (var j = 0; j < BOARD_SIZE; j++) {
            var cell = createCell()
            if (i === BOARD_SIZE - 1) cell.type = GROUND
            board[i][j] = cell
        }
    }
    createHero(board)
    createAliens(board)
    return board
}
// Render the board as a <table> to the page
function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            var cellClass = getClassName({ i: i, j: j })
            cellClass += (currCell.type === 'GROUND') ? ' ground' : ' sky';
            strHTML += `<td data-i="${i}" data-j="${j}" class="cell ${cellClass}">`

            switch (currCell.gameObject) {
                case HERO:
                    strHTML += HERO
                    break
                case ALIEN:
                    strHTML += ALIEN
                    break
            }
            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

// position such as: {i: 2, j: 7}
function updateCell(pos, gameObject) {
    gBoard[pos.i][pos.j].gameObject = gameObject;
    var elCell = getElCell(pos);
    elCell.innerHTML = gameObject || '';
}

function checkVictory() {
    if (!gGame.aliensCount) {
        return true
    }
    else return false
}

function gameOver(msg) {
    gGame.isOn = false
    clearInterval(gIntervalAliens)
    var elMsg = document.querySelector('.modal span')
    elMsg.innerText = msg
    openModal()
}