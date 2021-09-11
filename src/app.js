import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import './index.css';

function Game() {
	// constructor(props) {
	//   super(props)
	//   this.state = {
	//     history: [{
	//       squares: Array(9).fill(null),
	//       currentCell: null,
	//     }],
	//     currentStep: 0,
	//     xIsNext: true,
	//     winnerCombination: [],
	//     standoff: null,
	//   }
	// }

	const [history, setHistory] = useState([{
																	squares: Array(9).fill(null),
																	currentCell: null,
																}])
	const [currentStep, setCurrentStep] = useState(0)
	const [xIsNext, setXIsNext] = useState(true)
	const [winnerCombination, setWinnerCombination] = useState([])
	const [standoff, setStandoff] = useState(null)

	const current = history[currentStep]

	function handleClick(i) {
		const stepHistoryForStep = history.slice(0, currentStep + 1)
		const currentStepHistory = stepHistoryForStep[stepHistoryForStep.length - 1]
		const squares = currentStepHistory.squares.slice()

		if (squares[i] || winnerCombination.length !== 0) {
			return
		}

		squares[i] = xIsNext ? 'X' : 'O'
		
		setHistory((prev) => (
			stepHistoryForStep.concat([{
				squares: squares,
				currentCell: i,
			}]
		)))
		setCurrentStep(stepHistoryForStep.length)
		setXIsNext((prev) => !prev)

	}

	useEffect(() => {
		hasWinner()
		isStandoff()
	}, [history, currentStep, xIsNext])

 function hasWinner() {
	const winCombinations = calculateWinner(current.squares)
	if (winCombinations) {
		if (winnerCombination !== winCombinations) setWinnerCombination(winCombinations)
	}
 }

	function isStandoff() {
		if (winnerCombination.length === 0 && currentStep === 9) {
			setStandoff(true)
		}
	}

	function jumpTo(step) {
		const isEvenStep = (step % 2) === 0
		setXIsNext(isEvenStep)
		setCurrentStep(step)
		setStandoff(null)
		//TODO: учесть перемещение на последний шаг
		setWinnerCombination([])
	}

		let status
		if(winnerCombination) {
			status = `Выиграл ${xIsNext ? 'O' : 'X'}`
		} else {
			status = standoff ? 'Ничья' : `Next player: ${xIsNext ? 'X' : 'O'}`;
		}

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
	
	return null
	}
// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);