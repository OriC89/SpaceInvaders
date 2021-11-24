// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(gameObject = null) {
  return {
    type: 'SKY',
    gameObject: gameObject
  }
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
  var elScore = document.querySelector('h3 span')
  gGame.score += diff
  elScore.innerText = gGame.score
}

function openModal() {
  var elModal = document.querySelector('.modal')
  elModal.style.display = 'block'
}

function closeModal() {
  var elModal = document.querySelector('.modal')
  elModal.style.display = 'none'
}