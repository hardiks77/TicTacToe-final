
const cellDivs = document.querySelectorAll('.game-cell');
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const modalRestart = document.querySelector('.modal-restart');
const resultModal = document.querySelector('.result-shown');

let xIsNext = true;
let gameIsLive = true;


const xSymbol = '×';
const oSymbol = '○';

const letterToSymbol = (letter) => letter === 'x'? xSymbol : oSymbol;

const handleWin = (letter) => {
    gameIsLive = false;

    if(letter === 'x'){
        
        statusDiv.innerHTML = `${letterToSymbol(letter)} has won!`;
        const str = `${letterToSymbol(letter)} has won!`;
        $("#result-shown").html(str);
        $("#result-modal").modal();
    }
    else{
        
        statusDiv.innerHTML = `<span>${letterToSymbol(letter)}</span> has won!`;
        const str = `<span>${letterToSymbol(letter)}</span> has won!`;
        $("#result-shown").html(str);
        $("#result-modal").modal();
    }
}

const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[3];
    const topMid = cellDivs[1].classList[3];
    const topRight = cellDivs[2].classList[3];
    const midLeft = cellDivs[3].classList[3];
    const midMid = cellDivs[4].classList[3];
    const midRight = cellDivs[5].classList[3];
    const bottomLeft = cellDivs[6].classList[3];
    const bottomMid = cellDivs[7].classList[3];
    const bottomRight = cellDivs[8].classList[3];

    if(topLeft && topLeft === topMid && topMid === topRight){
        
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');
        handleWin(topLeft);
    }

    else if(midLeft && midLeft === midMid && midMid === midRight){
        
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
        handleWin(midLeft);
    }
    else if(bottomLeft && bottomLeft === bottomMid && bottomMid === bottomRight){
        
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');
        handleWin(bottomLeft);
    }
    else if(topLeft && topLeft === midLeft && midLeft === bottomLeft){
        
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
        handleWin(topLeft);
    }
    else if(topMid && topMid === midMid && midMid === bottomMid){
        
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');
        handleWin(topMid);
    }
    else if(topRight && topRight === midRight && midRight === bottomRight){
        
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
        handleWin(topRight);
    }
    else if(topLeft && topLeft === midMid && midMid === bottomRight){
        
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
        handleWin(topLeft);
    }
    else if(topRight && topRight === midMid && midMid === bottomLeft){
        
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');
        handleWin(topRight);
    }
    else if(topLeft && topMid && topRight && midLeft && midMid && midRight && bottomLeft && bottomMid && bottomRight){
        gameIsLive = false;
        statusDiv.innerHTML = 'Game is Tied!';
    }
    else{
        xIsNext = !xIsNext;

        if(xIsNext){
            statusDiv.innerHTML = `${xSymbol} is next`;
        }
        else{
            statusDiv.innerHTML = `<span>${oSymbol}</span> is next`;
        }
    }
}



const handleCellClick = (e) => {
    const classList = e.target.classList;
    

    if(!gameIsLive || classList[3] === "x" || classList[3] === "o"){
        return;
    }

    if(xIsNext){
        classList.add('x');
        checkGameStatus();
        
    }
    else{
        classList.add('o');
        checkGameStatus();
        
    }
}

const handleReset = () =>{
    xIsNext = true;
    gameIsLive = true;
    statusDiv.innerHTML = `${xSymbol} is next`;

    

    for(const cellDiv of cellDivs){
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }

    $("#result-modal").modal("hide");

}

resetDiv.addEventListener('click', handleReset);


$('#modal-restart').click(function() {
    xIsNext = true;
    gameIsLive = true;
    statusDiv.innerHTML = `${xSymbol} is next`;

    

    for(const cellDiv of cellDivs){
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }


    $("#result-modal").modal("hide");
});

for(const cellDiv of cellDivs){
    
    cellDiv.addEventListener('click', handleCellClick);
}