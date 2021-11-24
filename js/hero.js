'use strict'

const LASER_SPEED = 80;
var gShootInterval
var gHero = { pos: { i: 12, j: 5 }, isShoot: false }

// creates the hero and place it on board
function createHero(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            board[gHero.pos.i][gHero.pos.j].gameObject = HERO
        }
    }
}

// Handle game keys
function onKeyDown(ev) {
    var i = gHero.pos.i;
    var j = gHero.pos.j;

    switch (ev.key) {
        case 'ArrowLeft':
            moveHero(j - 1)
            break
        case 'ArrowRight':
            moveHero(j + 1)
            break
        case ' ':
            if (!gHero.isShoot) return
            shoot(i - 1)
            break
    }
}

// Move the hero right (1) or left (-1)
function moveHero(dir) {
    if (!gGame.isOn) return
    if (dir > gBoard.length - 1) return
    if (dir < 0) return
    gBoard[gHero.pos.i][dir].gameObject = HERO
    updateCell({ i: gHero.pos.i, j: dir }, HERO)
    gBoard[gHero.pos.i][gHero.pos.i].gameObject = null
    updateCell(gHero.pos, '')
    gHero.pos.j = dir
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot(pos) {
    if (!gGame.isOn) return
    updateCell(pos, LASER)
    gShootInterval = setInterval(function () {
        blinkLaser(pos)
    }, LASER_SPEED)
}

// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) {
    if (!gGame.isOn) return
    gHero.isShoot = true
    var targetCell = getElCell({ i: pos.i - 1, j: pos.j })
    if (targetCell.innerText === ALIEN) {
        gHero.isShoot = false
        updateCell({ i: pos.i - 1, j: pos.j }, '')
        handleAlienHit(pos)
    }
    updateCell(pos, '')
    pos.i--
    updateCell(pos, LASER)
}
