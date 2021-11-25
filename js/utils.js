'use strict'

// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(gameObject = null) {
  return {
    type: 'SKY',
    gameObject: gameObject
  }
}

// position such as: {i: 2, j: 7}
function updateCell(pos, gameObject) {
  gBoard[pos.i][pos.j].gameObject = gameObject;
  var elCell = getElCell(pos);
  elCell.innerHTML = gameObject || '';
}

function getElCell(pos) {
  return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`);
}

function getClassName(location) {
  var cellClass = 'cell-' + location.i + '-' + location.j;
  return cellClass;
}

function updateScore(diff) {
  // TODO: update model and dom
  var elScore = document.querySelector('h1 span')
  gGame.score += diff
  elScore.innerText = gGame.score
}

function openModal() {
  var elModal = document.querySelector('.modal')
  elModal.style.visibility = 'visible'
}

function closeModal() {
  var elModal = document.querySelector('.modal')
  elModal.style.visibility = 'hidden'
}

function getRandEmptyCell() {
  var emptyCells = getEmptyCells()
  if (emptyCells.length === 0 || !emptyCells) return
  var randCell = getRandomInt(0, emptyCells.length)
  var emptyCell = emptyCells[randCell]
  return emptyCell;
}

function getEmptyCells() {
  var emptyCells = []
  for (var i = 0; i < 1; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      var currCell = gBoard[i][j];
      if (currCell.gameObject === '') {
        emptyCells.push({ i, j })
      }
    }
  }
  return emptyCells
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}