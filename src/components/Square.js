import React from 'react';

const Square = ({value, b, currentCell, winnerCell, onClick}) => {
  const className = `square
                    ${currentCell ? 'square__current' : ''}
                    ${winnerCell ? 'square__win-call' : ''}
                    `

  return (
    <button
      className={className}
      onClick={()=>onClick()}
    >
      { value }{b}
    </button>
  );
}

export default Square