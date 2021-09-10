import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import './index.css';
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
      winnerCombination: [],
      standoff: null,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.currentStep + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    const winnerCombination = calculateWinner(squares)

    if (squares[i] || winnerCombination) {
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
    },() => {
      this.hasWinner()
      this.isStandoff()
    })
 }

 hasWinner() {
  const history = this.state.history
  const current = history[history.length - 1]

  const winCombinations = calculateWinner(current.squares)
  if (winCombinations) {
    this.setState((state) => {
      if (state.winnerCombination !== winCombinations) return {winnerCombination: winCombinations}
    })
  }
 }

 isStandoff() {
   if (this.state.winnerCombination.length === 0 && this.state.currentStep === 9) {
     this.setState(() => ({standoff: true}))
   }
 }

  jumpTo(step) {
    this.setState({
      currentStep: step,
      xIsNext: (step % 2) === 0,
      standoff: null,
      winnerCombination: [],
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.currentStep]
    const winner = calculateWinner(current.squares)

    let status
    if(winner) {
      status = `Выиграл ${this.state.xIsNext ? 'O' : 'X'}`
    } else {
      status = this.state.standoff ? 'Ничья' : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            onClick={(i)=>this.handleClick(i)}
            squares={current.squares}
            currentCell={current.currentCell}
            winnerCombination={this.state.winnerCombination}
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


function calculateWinner(squares) {
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
      return winCombinations[i]
      }
  }
  
  return null
  }
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);