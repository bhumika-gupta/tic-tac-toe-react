import { useState } from 'react';

function Square({value, onSquareClick}) {

  return (
    <button className="square" 
    onClick={onSquareClick}>
      {value}
    </button>
  );

}



function Board({ xIsNext, squares, onPlay }) {

  function handleClick(i) {
    
     
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    
    // slice() Array method creates copy of squares array (nextSquares)
    const nextSquares = squares.slice();
    

    if (xIsNext) {
        // updates the nextSquares array to add X to ith square
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }
      onPlay(nextSquares);
    
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }




  /*let boardRows = [];
  let boardSquares = [];

  for (let rowValue = 0; rowValue < 3; rowValue++) {
    
    

    for (let squareValue = 0; squareValue < 9; squareValue++) {
      boardSquares.push
        (this.Square(squareValue);
      );

      
    }

  } */

  // GOOD WAY 
  /*
  const boardRows = [Array(3)].map((row, rowIndex) => {
    const boardSquares = [Array(3)].map((square, squareIndex) => {
      return (
        <Square 
          key={3* rowIndex + squareIndex}
          value={squares[3 * rowIndex + squareIndex]}
          onSquareClick={() => handleClick(3 * rowIndex + squareIndex)}
        />
      );
    });
  
  return (
    <div key={rowIndex} className="board-row">
        {boardSquares}
    </div>
    )
  }); */

  // but i wanna re-work my way:
  const boardRows = [];
  for (rowValue = 0; rowValue < 3; rowValue++) {
    const boardSquares = [];
    for (squareValue = 0; squareValue < 3; squareValue++) {
      const index = 3 * rowValue + squareValue;
      boardSquares.push(
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}

        />
      );
    }
    boardRows.push(
      <div key={rowValue} className="board-row">
        {boardSquares}
      </div>
    );
  }

  // () => syntax: When the square is clicked, the code after the => “arrow” will run, calling handleClick(0)

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}
/*
        for (let squareValue = 0; squareValue < 9; squareValue++) {
          <Square value={squares[squareValue]} onSquareClick={() => handleClick(squareValue)}/>
        } 
        
      } */
/* 

        

        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>

      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>

      </div>
      */

export default function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory); 

    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);

  }

  const moves = history.map((squares, move) => { 
    let description;
    if (move > 0) { 
      //  && !calculateWinner(currentSquares)
      description = 'Go to move #' + move;
    } else {
      description = 'Restart Game';

    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });


  const moveInformation = (currentMove > 0) ?
    "You are at move #" + currentMove + ".":
    "You are at the start of the game."

  


  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>Game Information:</ol>
        <ol>{moveInformation}</ol>
        {moves}
      </div>
    </div>
  );
}

/*
function postGame() {
  


} */

function calculateWinner(squares) {
  const lines = [
     [0, 1, 2],
     [0, 4, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [2, 4, 6],
     [3, 4, 5],
     [6, 7, 8]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
      return squares[a];
    }
  }
  return null;
}
