


const cellDivs = document.querySelectorAll('.game-cell');
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const modalRestart = document.querySelector('.modal-restart');
const resultModal = document.querySelector('.result-shown');


// variables for the status of game

let xIsNext = true;
let gameIsLive = true;

// The X and O symbols 
const xSymbol = '×';
const oSymbol = '○';

// to convert x and o to our game symbols

const letterToSymbol = (letter) => letter === 'x'? xSymbol : oSymbol;

// handleWin- handles the win and assign proper values to status bars and open modal

const handleWin = (letter) => {
    gameIsLive = false; //game is no longer live

    if(letter === 'x'){ //if x wins
        

        statusDiv.innerHTML = `${letterToSymbol(letter)} has won!`; //status bar update
        const str = `${letterToSymbol(letter)} has won!`; 
        $("#result-shown").html(str); //updates modal with the result
        $("#result-modal").modal(); //opens modal
    }
    else{ //if o wins
        
        statusDiv.innerHTML = `<span>${letterToSymbol(letter)}</span> has won!`; //status bar update
        const str = `<span>${letterToSymbol(letter)}</span> has won!`;
        $("#result-shown").html(str); //updates modal with the result
        $("#result-modal").modal(); //opens modal
    }
}

const checkGameStatus = () => { //checks if someone has won or not

    //variables for 'x' and 'o' classes in the game cells
    const topLeft = cellDivs[0].classList[3]; 
    const topMid = cellDivs[1].classList[3];
    const topRight = cellDivs[2].classList[3];
    const midLeft = cellDivs[3].classList[3];
    const midMid = cellDivs[4].classList[3];
    const midRight = cellDivs[5].classList[3];
    const bottomLeft = cellDivs[6].classList[3];
    const bottomMid = cellDivs[7].classList[3];
    const bottomRight = cellDivs[8].classList[3];

    if(topLeft && topLeft === topMid && topMid === topRight){ //top horizontal row 
        
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');
        handleWin(topLeft); 
    }

    else if(midLeft && midLeft === midMid && midMid === midRight){ //middle horizontal row
        
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
        handleWin(midLeft);
    }
    else if(bottomLeft && bottomLeft === bottomMid && bottomMid === bottomRight){ //bottom horizontal row
        
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');
        handleWin(bottomLeft);
    }
    else if(topLeft && topLeft === midLeft && midLeft === bottomLeft){ //left vertical row
        
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
        handleWin(topLeft);
    }
    else if(topMid && topMid === midMid && midMid === bottomMid){ //middle vertical row
        
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');
        handleWin(topMid);
    }
    else if(topRight && topRight === midRight && midRight === bottomRight){ //right vertical row
        
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
        handleWin(topRight);
    }
    else if(topLeft && topLeft === midMid && midMid === bottomRight){ //first diagonal
        
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
        handleWin(topLeft);
    }
    else if(topRight && topRight === midMid && midMid === bottomLeft){ //second diagonal
        
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');
        handleWin(topRight);
    }
    else if(topLeft && topMid && topRight && midLeft && midMid && midRight && bottomLeft && bottomMid && bottomRight){ //when no-one wins
        gameIsLive = false;
        statusDiv.innerHTML = 'Game is Tied!'; //status bar update
        const str = 'Game is Tied!';
        $("#result-shown").html(str); //updates modal with the result
        $("#result-modal").modal(); //opens modal
    }
    else{
        xIsNext = !xIsNext; //if its 'x's turn or 'o's 

        if(xIsNext){
            statusDiv.innerHTML = `${xSymbol} is next`; //status bar update
        }
        else{
            statusDiv.innerHTML = `<span>${oSymbol}</span> is next`; //status bar update
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

const handleReset = () =>{  //function to handle 'reset' button click
    //resetting the game to its initial state
    xIsNext = true; 
    gameIsLive = true;
    statusDiv.innerHTML = `${xSymbol} is next`; //status bar

    
    //removing the classes from every gamecell
    for(const cellDiv of cellDivs){
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }

    

}

resetDiv.addEventListener('click', handleReset); //listens to reset button click


$('#modal-restart').click( () => {  //handles 'restart' button click in the modal
    //resetting the game to its initial state
    xIsNext = true;
    gameIsLive = true;
    statusDiv.innerHTML = `${xSymbol} is next`; //status bar

    
    //removing the classes from every gamecell
    for(const cellDiv of cellDivs){
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }

    //hiding the modal
    $("#result-modal").modal("hide");
});

for(const cellDiv of cellDivs){
    
    cellDiv.addEventListener('click', handleCellClick); //handling click on each game cell
}