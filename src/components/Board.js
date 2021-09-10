import React from 'react';
import Square from './Square';

function Board({squares, onClick, currentCell, winnerCombination}) {
  let tableRange = [0,1,2]
  
  return (
    <div>
      {tableRange.map((rowIndex) => {
        return (
          <div className="board-row" key={rowIndex}>
            {tableRange.map((columnIndex) => {
              const i = rowIndex*3 + columnIndex
              return (
                <Square
                  value={squares[i]} 
                  onClick={() => onClick(i)}
                  currentCell={currentCell === i ? true : false }
                  key={i}
                  b={i}
                  winnerCell={winnerCombination.includes(i) ? true : false}
                />
              )
              })
            }
          </div>
        )
      })}
    </div>
  )
}


export default Board