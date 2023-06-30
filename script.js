const region = document.querySelectorAll("#gameBoard span")
let vBoard = []
let turnPlayer= ''


function updatePlayer(){
  const playerInput = document.getElementById(turnPlayer)
  document.getElementById('turnPlayer').innerText = playerInput.value 
}

function disabledRegion(element){
  element.removeEventListener('click', handleBoardClick)
}

function initializeGame(){
  vBoard = [['','',''], ['','',''],['','','']]
  turnPlayer = 'player1'
  document.querySelector("h2").innerHTML = 'Vez de: <span id="turnPlayer"></span>'
  updatePlayer()
  region.forEach(element => {
    element.classList.remove('win')
    element.innerText = ''
    element.addEventListener("click", handleBoardClick)
  })

}

function handleBoardClick(ev){
  const span = ev.currentTarget
  const region = span.dataset.region 
  const rowColumn = region.split('.')
  const row = rowColumn[0]
  const column = rowColumn[1]
  if(turnPlayer === 'player1'){
    span.innerText = 'X'
    vBoard[row][column] = 'X'
  } else{
    span.innerText = 'O'
    vBoard[row][column] = 'O'
  }
  console.clear()
  console.table(vBoard)
  disabledRegion(span)
  const winRegions = getWinRegions()
  if(winRegions.length > 0){
    handleWin(winRegions)
}else if(vBoard.flat().includes('')){
  turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
  updatePlayer()
}else{
  document.querySelector('h2').innerText = 'Empate!'
}
  
}
function handleWin(regions){
  regions.forEach(region => {
    document.querySelector('[data-region="'+ region + '"]').classList.add('win')
  })
  let playerWin = document.getElementById(turnPlayer).value 
  document.querySelector('h2').innerText = `${playerWin} Venceu!`
}



function getWinRegions(){
  const winRegions = []
  if(vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
    winRegions.push('0.0', '0.1', '0.2')
  if(vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[0][0] === vBoard[1][2])
    winRegions.push('1.0', '1.1', '1.2')
  if(vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[0][0] === vBoard[2][2])
    winRegions.push('2.0', '2.1', '2.2')
    
  if(vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
    winRegions.push('0.0', '1.0', '2.0')
    
  if(vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
    winRegions.push('0.1', '1.1', '2.1')

    if(vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
      winRegions.push('0.2', '1.2', '2.2')

  if(vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
    winRegions.push('0.0', '1.1', '2.2')

  if(vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
    winRegions.push('0.2', '1.1', '2.0')
    
  return winRegions
  
}


document.getElementById("start").addEventListener("click" , initializeGame)