import React, {useState} from 'react';

function GameInfo({history, onClick, status}) {

	const [isReversedList, setIsReversedList] = useState(false)
	
	const movesListResult = getMovesList(isReversedList)

	function getMovesList(isReversed) {
		const list = history.map((item, index)=>{
									const desc = 'Переход к ходу ' + index + ` : ${getStepName(item.currentCell)} `
									return (
										<li key={index} className="game-info__steps">
											<button onClick={()=>onClick(index)}>{desc}</button>
										</li>)
									}).slice(1) // Отрезаем нулевой ход
		return isReversed ? list.reverse() : list
	}
	
	
	function reverseStepsList() {
		setIsReversedList((prev) => !prev)
	}
	
	return (
		<div className="game-info">
			<div>{status}</div>
			<div className="game-info__controlls">
				<button onClick={reverseStepsList}>В обратном порядке</button>
				<button onClick={()=>onClick(0)}>К началу игры</button>
			</div>
			<ol reversed={isReversedList}>
				{movesListResult}
			</ol>
		</div>
	)
}

function getStepName(i) {
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

export default GameInfo