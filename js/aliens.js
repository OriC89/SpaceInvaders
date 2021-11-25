'use strict'

const ALIEN_SPEED = 500
var gAliensTopRowIdx = 0
var gAliensBottomRowIdx = 2

var gIntervalAliens;
var gIsFrozen = false


function createAliens(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            if ((i < ALIENS_ROW_COUNT) && (j < ALIENS_ROW_LENGTH)) currCell.gameObject = ALIEN
        }
    }
}

function handleAlienHit(pos) {
    updateScore(10)
    updateCell(pos, '')
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].gameObject === ALIEN) return
        }
    }
    if (checkVictory()) {
        gameOver('VICTORY!')
    }
}

function shiftBoardRight(board, fromI, toI) {
    if (!gGame.isOn) return
    if (gIsFrozen) return

    for (var i = fromI; i <= toI; i++) { // MOVES ON THE ROW BY IDX
        for (var j = board.length - 1; j >= 0; j--) { // SET LAST RIGHT MOVMENT 

            var targetCell = getElCell({ i: i, j: j })
            if (targetCell.innerText === ALIEN) {

                if (j === board.length - 1) { // ENDS MOVMENT TO THE RIGHT
                    clearInterval(gIntervalAliens)
                    gIntervalAliens = null
                    shiftBoardDown(gBoard, gAliensTopRowIdx++, gAliensBottomRowIdx++)
                    gIntervalAliens = setInterval(function () {
                        shiftBoardLeft(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
                    }, ALIEN_SPEED)
                    return
                }

                updateCell({ i: i, j: j }, '')
                updateCell({ i: i, j: j + 1 }, ALIEN)
            }
        }
    }
}

function shiftBoardLeft(board, fromI, toI) {
    if (!gGame.isOn) return
    if (gIsFrozen) return

    for (var i = fromI; i <= toI; i++) { // MOVES ON THE ROW BY IDX
        for (var j = 0; j <= board.length - 1; j++) { // SET LAST LEFT MOVMENT

            var targetCell = getElCell({ i: i, j: j })
            if (targetCell.innerText === ALIEN) {

                if (j === 0) { // ENDS MOVMENT TO LEFT
                    clearInterval(gIntervalAliens)
                    gIntervalAliens = null
                    shiftBoardDown(gBoard, gAliensTopRowIdx++, gAliensBottomRowIdx++)
                    gIntervalAliens = setInterval(function () {
                        shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
                    }, ALIEN_SPEED)
                    return
                }

                updateCell({ i: i, j: j }, '');
                updateCell({ i: i, j: j - 1 }, ALIEN)
            }
        }
    }
}

function shiftBoardDown(board, fromI, toI) {
    if (!gGame.isOn) return
    if (gIsFrozen) return

    for (var i = toI; i >= fromI; i--) { // NOVES DOWN THE ROW IDX
        for (var j = board.length - 1; j >= 0; j--) { //SET CONDITION TO BOARD DOWN

            var targetCell = getElCell({ i: i, j: j })
            if (targetCell.innerText === ALIEN) {

                updateCell({ i: i, j: j }, '')
                updateCell({ i: i + 1, j: j }, ALIEN)
            }

            if (board[12][j].gameObject === ALIEN) {
                // SET GAME OVER CONDITION
                if (checkVictory()) {
                    gameOver('LOST!');
                }
                return
            }
        }
    }
}

function moveAliens() {
    if (!gGame.isOn) return
    if (gIsFrozen) return

    gIntervalAliens = setInterval(function () {
        shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
    }, ALIEN_SPEED)
}
