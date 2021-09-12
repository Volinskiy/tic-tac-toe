import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import './index.css';

function Game() {
	const [history, setHistory] = useState([{
                                  squares: Array(9).fill(null),
                                  currentCell: null,
                                }])
	const [currentStep, setCurrentStep] = useState(0)
	const [xIsNext, setXIsNext] = useState(true)
	const [winnerCombination, setWinnerCombination] = useState([])
	const [standoff, setStandoff] = useState(false)

	function handleClick(i) {
		const currentSquares = history[currentStep].squares.slice()

		if (currentSquares[i] || winnerCombination.length !== 0) {
			return
		}

		currentSquares[i] = xIsNext ? 'X' : 'O'
		
		setHistory((prev) => (
      prev.slice(0, currentStep + 1).concat([{
        squares: currentSquares,
        currentCell: i,
      }]))
    )
		setCurrentStep((prev) => prev + 1)
	}

	function jumpTo(step) {
		setCurrentStep(step)
	}

	useEffect(() => {
    function hasWinner() {
      const currentSquares = history[currentStep].squares.slice()
      const winCombinations = calculateWinner(currentSquares)
      console.log(winCombinations);
      //TODO: Разобраться почему возникает песконечный цикл
      setWinnerCombination((prev) => prev !== winCombinations ? winCombinations : prev)
    }
    
    function isStandoff() {
      if (winnerCombination.length === 0 && currentStep === 9) {
        setStandoff(true)
      } else {
        setStandoff(false)
      }
    }
  
    function whoNext() {
      const isEvenStep = (currentStep % 2) === 0
      setXIsNext(isEvenStep)
    }

    hasWinner()
		isStandoff()
    whoNext()
	}, [history, currentStep, winnerCombination])

  let status
  if(winnerCombination.length > 0) {
    status = `Выиграл ${xIsNext ? 'O' : 'X'}`
  } else {
    status = standoff ? 'Ничья' : `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const current = Object.assign({}, history[currentStep])

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          onClick={(i)=>handleClick(i)}
          squares={current.squares}
          currentCell={current.currentCell}
          winnerCombination={winnerCombination}
        />
      </div>
      <GameInfo
        onClick={(step) => jumpTo(step)}
        history={history}
        status={status}
      />
    </div>
  );
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
	
	return []
	}
// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);