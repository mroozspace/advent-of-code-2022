const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('./input.txt');

const GAME_OBJECTS = {
  ROCK: 'ROCK',
  SCISSORS: 'SCISSORS',
  PAPER: 'PAPER'
}

const RESULTS = {
  DRAW: 'DRAW',
  WIN: 'WIN',
  LOSS: 'LOSS'
}

const MOVES_FIGURES_MAP = {
  A: GAME_OBJECTS.ROCK,
  B: GAME_OBJECTS.PAPER,
  C: GAME_OBJECTS.SCISSORS,
  X: GAME_OBJECTS.ROCK,
  Y: GAME_OBJECTS.PAPER,
  Z: GAME_OBJECTS.SCISSORS
}

const FIGURE_POINTS_MAP = {
  [GAME_OBJECTS.PAPER]: 2,
  [GAME_OBJECTS.ROCK]: 1,
  [GAME_OBJECTS.SCISSORS]: 3,
}

const RESULT_POINTS_MAP = {
  [RESULTS.DRAW]: 3,
  [RESULTS.LOSS]: 0,
  [RESULTS.WIN]: 6,
}

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

let totalPoints = 0
rl.on('line', (moves) => {
  let result = ''
  const [opponentMove, playerMove] = moves.split(' ')
  // calculate points
  const playerFigure = MOVES_FIGURES_MAP[playerMove]
  const opponentFigure = MOVES_FIGURES_MAP[opponentMove]
  const figurePoints = FIGURE_POINTS_MAP[playerFigure]

  if (playerFigure === opponentFigure) {
    result = RESULTS.DRAW
  }
  if (playerFigure == GAME_OBJECTS.PAPER) {
    if (opponentFigure == GAME_OBJECTS.ROCK) result = RESULTS.WIN
    if (opponentFigure == GAME_OBJECTS.SCISSORS) result = RESULTS.LOSS
  }
  if (playerFigure == GAME_OBJECTS.ROCK) {
    if (opponentFigure == GAME_OBJECTS.PAPER) result = RESULTS.LOSS
    if (opponentFigure == GAME_OBJECTS.SCISSORS) result = RESULTS.WIN
  }
  if (playerFigure == GAME_OBJECTS.SCISSORS) {
    if (opponentFigure == GAME_OBJECTS.ROCK) result = RESULTS.LOSS
    if (opponentFigure == GAME_OBJECTS.PAPER) result = RESULTS.WIN
  }

  totalPoints += RESULT_POINTS_MAP[result] + figurePoints
}).once('close', () => {
  console.log('total points:', totalPoints)
});
