'use strict'

const LASER_SPEED = 80
const LASERSUPER = 30
var gHero = { pos: { i: 12, j: 5 }, isShoot: false }

var gNegsBlowUp = false

var gSuperShoot = false
var gSuperCounter = 3

var gShootInterval


// TO DO // 

// Lives
// Add support for “LIVES” - The user has 3 LIVES:
// When a laser hits your spaceship, there is an indication to the user that he got hit.
// The LIVES counter decrease. The user can continue playing

// Aliens Variety
// Make the aliens rows look different from each other

// Levels
// Support 3 levels(Easy, Normal, Hard) those will affect aliens count, and speeds

// Shields
// When player press 'z' his symbol change and he is safe for 5 seconds. Player has 3 Shields

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
            if (gHero.isShoot) return
            shoot({ i: i - 1, j: j })
            break
        case 'n':
            gNegsBlowUp = true
            break
        case 'x':
            if (gHero.isShoot) return
            if (gSuperCounter === 0) return
            gSuperShoot = true
            shoot({ i: i - 1, j: j })
            break

    }
}

// Move the hero right (1) or left (-1)
function moveHero(dir) {
    if (!gGame.isOn) return
    if (dir > gBoard.length - 1) return
    if (dir < 0) return
    gBoard[gHero.pos.i][dir].gameObject = HERO
    updateCell({ i: gHero.pos.i, j: dir }, HERO_IMG)
    gBoard[gHero.pos.i][gHero.pos.i].gameObject = null
    updateCell(gHero.pos, '')
    gHero.pos.j = dir
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot(pos) {
    if (!gGame.isOn) return
    if (gSuperShoot) {
        gSuperCounter--
        updateCell(pos, SUPERLASER)
        var elSuperShoot = document.querySelector('.header h3 span')
        elSuperShoot.innerText = gSuperCounter
        gShootInterval = setInterval(function () {
            blinkLaser(pos)
        }, LASERSUPER)
    } else {
        updateCell(pos, LASER)
        gShootInterval = setInterval(function () {
            blinkLaser(pos)
        }, LASER_SPEED)
    }
}

// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) {
    if (!gGame.isOn) return
    gHero.isShoot = true

    if (pos.i === 0) {
        clearInterval(gShootInterval)
        updateCell(pos, '')
        gHero.isShoot = false
        return
    }

    var nextCell = getElCell({ i: pos.i - 1, j: pos.j })
    // console.log('targetCell:', targetCell)
    if (nextCell.innerText === ALIEN) {

        if (gNegsBlowUp) {
            blowHitAlienNegs(pos)
            updateScore(-10)
            gNegsBlowUp = false
        }

        updateCell({ i: pos.i - 1, j: pos.j }, '')
        gHero.isShoot = false
        clearInterval(gShootInterval)
        handleAlienHit(pos)
        gSuperShoot = false
        return
    }
    if (nextCell.innerText === SPACESWEET) {
        updateScore(50)
        gIsFrozen = true
        setTimeout(function () {
            gIsFrozen = false
        }, 5000)
    }
    updateCell(pos, '')
    pos.i--
    updateCell(pos, gSuperShoot ? SUPERLASER : LASER)
}

function blowHitAlienNegs(pos) {
    var iPos = pos.i
    var jPos = pos.j
    for (var i = iPos - 1; i <= iPos + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = jPos - 1; j <= jPos + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === iPos && j === jPos) continue
            if (gBoard[i][j].gameObject === ALIEN) {
                handleAlienHit({ i: i, j: j })
            }
        }
    }
}