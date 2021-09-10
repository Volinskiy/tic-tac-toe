import React from 'react';
import {getStepName} from '../lib/common.js';

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
      const desc = 'Переход к ходу ' + index + ` : ${getStepName(item.currentCell)} `
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

export default GameInfo