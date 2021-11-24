'use strict'

const ALIEN_SPEED = 500;
var gIntervalAliens;
var gAliensTopRowIdx = 0
var gAliensBottomRowIdx = 3
var gIsAlienFreeze = true;
var gAliens = []


function createAliens(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            if ((i < ALIENS_ROW_COUNT) && (j < ALIENS_ROW_LENGTH)) currCell.gameObject = ALIEN
        }
    }
}


function handleAlienHit(pos) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].gameObject === ALIEN) return;
        }
    }
    updateScore(10)
    updateCell(pos, '')
    if (checkVictory()) {
        gameOver('WON')
    }
}

function shiftBoardRight(board, fromI, toI) { }

function shiftBoardLeft(board, fromI, toI) { }

function shiftBoardDown(board, fromI, toI) { }

// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
function moveAliens() {

}
