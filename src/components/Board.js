import React from 'react';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    const {winnerCombination} = this.props
    return (
      <Square
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
        currentCell={this.props.currentCell === i ? true : false }
        key={i}
        b={i}
        winnerCell={winnerCombination.includes(i) ? true : false}
      />
    )
  }
  
  getTable() {
    let table = [0,1,2]
    return (
      <div>
        {table.map((rowIndex) => {
          return (
            <div className="board-row" key={rowIndex}>
              {table.map((columnIndex) => {
                return this.renderSquare(rowIndex*3 + columnIndex)
                })
              }
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.getTable()}
      </div>
    );
  }
}

export default Board