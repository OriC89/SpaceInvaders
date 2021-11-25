'use strict'

const BOARD_SIZE = 14;
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3
const HERO = '♆';
const ALIEN = '👾';
const LASER = '⚡'
const SUPERLASER = '🚀'
const GROUND = '🧱'
const SPACESWEET = '🍬'

// TO DO //
// var ALIEN_1ST_ROW
// var ALIEN_2ND_ROW
// var ALIEN_3RD_ROW
// var SPACESWEET_IMG
// var SUPERLASER_IMG
// var GROUND_IMG
// var LASER_IMG

// Bunkers
// Add bunkers to your board, when aliens, rocks or lasers engage with it, they destroy it. 
// var bunker


var HERO_IMG = '<img src="/img/sis.png" alt="">'

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard;
var gGame = {
    isOn: false,
    aliensCount: 0,
    score: 0
}

var gSpaceSweetIntervel

// Called when game loads
function init() {
    var elStartBtn = document.querySelector('.start')
    elStartBtn.style.display = 'none'
    gBoard = createBoard()
    renderBoard(gBoard)
    gSpaceSweetIntervel = setInterval(addSpaceSweet, 10000)
    gGame.isOn = true
    gGame.aliensCount = 0
    gGame.score = 0
    moveAliens()
    closeModal()
}

function restartGame() {
    window.location.reload() // https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
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
            cellClass += (currCell.type === GROUND) ? ' ground' : ' sky';
            strHTML += `<td data-i="${i}" data-j="${j}" class="cell ${cellClass}">`

            switch (currCell.gameObject) {
                case HERO:
                    strHTML += HERO_IMG
                    break
                case ALIEN:
                    strHTML += ALIEN
                    break
                case LASER:
                    strHTML += LASER
                    break
                case SUPERLASER:
                    strHTML += SUPERLASER
                    break
                case SPACESWEET:
                    strHTML += SPACESWEET
            }
            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
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
    clearInterval(gSpaceSweetIntervel)
    var elMsg = document.querySelector('.modal span')
    elMsg.innerText = msg
    openModal()
}

function addSpaceSweet() {
    if (!gGame.isOn) return
    var cell = getRandEmptyCell()
    // console.log('cell:', cell)
    updateCell({ i: cell.i, j: cell.j }, SPACESWEET)
    setTimeout(function () {
        updateCell({ i: cell.i, j: cell.j }, '')
    }, 5000)
}
