
/* 

first line: 
- "export" keyword makes the function accessible
outside of this file
- "default" keyword tells other files using your code that
it's the main function in your file

second line: returns a button
- "return" keyword = whatever comes after is returned to
the caller of the function
- "button" is a JSX element (combo of JS code & HTML tags
that describes what you'd like to display)

*/


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

  // const [xIsNext, setXIsNext] = useState(true);

  // const [value, setValue] = useState(null);
  // const [squares, setSquares] = useState(Array(9).fill(null));


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
      
      //setSquares(nextSquares);
      //setXIsNext(!xIsNext);
    
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // () => syntax: When the square is clicked, the code after the => “arrow” will run, calling handleClick(0)

  return (
    <>
      <div className="status">{status}</div>

      <div className="board-row">

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
    </>
  );
}

export default function Game() {

  //const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  // const currentSquares = history[history.length - 1];
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    //history.push(currentSquares); (not right)



    //setHistory(history); (not right)


    // given way:
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory); 

    setCurrentMove(nextHistory.length - 1);



    //ur own way: (still not right)
    //setHistory(history.push(...nextSquares));
    //history.push(...nextSquares);
    //setHistory(history);

    //setXIsNext(!xIsNext);





  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    //setXIsNext(nextMove % 2 === 0);

  }

  // const arrayPastMoves = history.map((move) => <li>{move}</li>);

  const moves = history.map((squares, move) => { 
    let description;
    if (move > 0) { 
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const moveInformation = "You are at move #" + currentMove;




  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>Game Information:</ol>
        {moveInformation}
        {moves}
      </div>
    </div>
  );
}




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
