import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = (props) => {
  const className = `square ${props.currentCell ? 'square__current' : ''}`

  return (
    <button
      className={className}
      onClick={props.onClick}
    >
      { props.value }
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
        currentCell={this.props.currentCell === i ? true : false }
        key={i}
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

class GameInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      isReversedList: false,
    }
  }

  reverseList() {
    this.setState((state) => ({isReversedList: !state.isReversedList}))
  }
  
  render() {
    const {history, onClick, status} = this.props
    // Заменить метод сортировки reverse() выполняет сортировку in-place, не создавая копии массива
    // это ломает программу. Нельзя менять пропсы
    // Сделать состояние reverse
    const moves = history.map((item, index)=>{
      const desc = 'Переход к ходу ' + index + ` ${getCellNumber(item.currentCell)} `
      return (
        <li key={index} className="game-info__steps">
          {/* onClick={onClick(index)} приводило к потере this === undefined Почему? */}
          <button onClick={()=>onClick(index)}>{desc}</button>
        </li>)
      })
    const movesResult = this.state.isReversedList ? moves.slice(1).reverse() : moves.slice(1)
    
    return (
      <div className="game-info">
        <div>{status}</div>
        <div className="game-info__controlls">
          <button onClick={()=>this.reverseList()}>В обратном порядке</button>
          <button onClick={()=>onClick(0)}>К началу игры</button>
        </div>
        <ol reversed={this.state.isReversedList}>
          {movesResult}
        </ol>
      </div>
    )
  }
}


class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        currentCell: null,
      }],
      currentStep: 0,
      xIsNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.currentStep + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (squares[i] || this.calculateWinner(squares)) {
      return
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O'
    
    this.setState({
      history: history.concat([{
        squares: squares,
        currentCell: i,
      }]),
      currentStep: history.length,
      xIsNext: !this.state.xIsNext,
    });
 }

  calculateWinner(squares) {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i=0; i<winCombinations.length; i++) {
      const [a, b, c] = winCombinations[i]
      if (squares[a] && squares[a]===squares[b] && squares[a]===squares[c]) {
        return squares[a]
      }
    }

    return null
  }

  jumpTo(step) {
    this.setState({
      currentStep: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.currentStep]
    const winner = this.calculateWinner(current.squares)
    let status
    if(winner) {
      status = 'Выиграл ' + winner
    } else {
      status =`Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            onClick={(i)=>this.handleClick(i)}
            squares={current.squares}
            currentCell={current.currentCell}
          />
        </div>
        <GameInfo
          onClick={(step) => this.jumpTo(step)}
          history={history}
          status={status}
        />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function getCellNumber(i) {
  const cells = {
    0: '1 x 1',
    1: '1 x 2',
    2: '1 x 3',
    3: '2 x 1',
    4: '2 x 2',
    5: '2 x 3',
    6: '3 x 1',
    7: '3 x 2',
    8: '3 x 3',
  }
  return cells[i]
}