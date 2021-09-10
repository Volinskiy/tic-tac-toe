// export function getStepName(i) {
//     const cells = {
//       0: '1 x 1',
//       1: '1 x 2',
//       2: '1 x 3',
//       3: '2 x 1',
//       4: '2 x 2',
//       5: '2 x 3',
//       6: '3 x 1',
//       7: '3 x 2',
//       8: '3 x 3',
//     }
//     return cells[i]
//   }
  
// export function calculateWinner(squares) {
// const winCombinations = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
// ]

// for (let i=0; i<winCombinations.length; i++) {
//     const [a, b, c] = winCombinations[i]
//     if (squares[a] && squares[a]===squares[b] && squares[a]===squares[c]) {
//     return winCombinations[i]
//     }
// }

// return null
// }