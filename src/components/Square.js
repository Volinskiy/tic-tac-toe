import React from 'react';

const Square = (props) => {
  const className = `square
                    ${props.currentCell ? 'square__current' : ''}
                    ${props.winnerCell ? 'square__win-call' : ''}
                    `

  return (
    <button
      className={className}
      onClick={props.onClick}
    >
      { props.value }{props.b}
    </button>
  );
}

export default Square