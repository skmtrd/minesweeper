import { useState } from 'react';
import styles from './index.module.css';

const getRandomIntNumber = (min: number, max: number) => {
  return [
    Math.floor(Math.random() * (max - min + 1)) + min,
    Math.floor(Math.random() * (max - min + 1)) + min,
  ];
};

const initialArray = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const directions = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];
const faceImage = [0];
const finishChecker = [0];
const allBombNum = [10];
const bombCount = [10];
const frontBoardCount = [0, 0, 0];
const clickCount: number[] = [0, 0];
const plantPlace: number[][] = [];
const explodedCell: number[][] = [[]];
const initializeCount = [0];
const crushPoint: number[][] = [];
const calculateScore = (frontBoard: number[][]) => {
  frontBoardCount[0] = frontBoard.flat().filter((cell) => cell === -1).length;
  frontBoardCount[1] = frontBoard.flat().filter((cell) => cell === 0).length;
  frontBoardCount[2] = frontBoard.flat().filter((cell) => cell === 1).length;
  if (
    frontBoardCount[0] + frontBoardCount[1] + frontBoardCount[2] - allBombNum[0] ===
    frontBoardCount[0]
  ) {
    finishChecker[0]++;
    faceImage[0] = 1;
  }
};
const resetSomeArray = () => {
  clickCount.fill(0);
  plantPlace.length = 0;
  explodedCell.length = 0;
  explodedCell[0] = [];
  initializeCount[0] = 0;
  faceImage[0] = 0;
  finishChecker[0] = 0;
  crushPoint.length = 0;
};
const plantBombs = (map: number[][], x: number, y: number) => {
  while (plantPlace.length < allBombNum[0]) {
    const preBombPlace: number[] = getRandomIntNumber(0, 8);
    if (preBombPlace[0] === y && preBombPlace[1] === x) continue;
    const checkOverlap = [0];
    for (const item of plantPlace) {
      if (item[0] === preBombPlace[0] && item[1] === preBombPlace[1]) checkOverlap[0]++;
    }
    if (checkOverlap[0] !== 0) continue;
    plantPlace.push(preBombPlace);
  }
  for (const bomb of plantPlace) {
    map[bomb[0]][bomb[1]] = 1;
  }
  return map;
};

const determineNumber = (map: number[][]) => {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (map[y][x] === 1) continue;
      const aroundBombNumber: number[] = [0];
      for (const dir of directions) {
        if (map[y + dir[0]] !== undefined && map[y + dir[0]][x + dir[1]] === 1) {
          aroundBombNumber[0]--;
        }
      }
      map[y][x] = aroundBombNumber[0];
    }
  }
  return map;
};

const crushCell = (map: number[][], frontBoard: number[][], x: number, y: number) => {
  if (map[y][x] === 1) {
    finishChecker[0]++;
    faceImage[0] = 2;
    frontBoard[y][x] = -1;
    explodedCell[0] = [y, x];
    for (const point of plantPlace) {
      frontBoard[point[0]][point[1]] = -1;
    }
    return frontBoard;
  }
  if (map[y][x] < 0) {
    frontBoard[y][x] = -1;
    return frontBoard;
  }
  crushPoint.length = 0;
  crushByRecursive(map, x, y);
  for (const point of crushPoint) {
    frontBoard[point[0]][point[1]] = -1;
    for (const dir of directions) {
      if (map[point[0] + dir[0]] !== undefined && map[point[0] + dir[0]][point[1] + dir[1]] < 0) {
        frontBoard[point[0] + dir[0]][point[1] + dir[1]] = -1;
      }
    }
  }
  return frontBoard;
};

const crushByRecursive = (map: number[][], x: number, y: number) => {
  for (const point of crushPoint) {
    if (point[0] === y && point[1] === x) return;
  }
  if (map[y] === undefined || map[y][x] !== 0) return;
  crushPoint.push([y, x]);
  crushByRecursive(map, x + directions[0][1], y + directions[0][0]);
  crushByRecursive(map, x + directions[1][1], y + directions[1][0]);
  crushByRecursive(map, x + directions[2][1], y + directions[2][0]);
  crushByRecursive(map, x + directions[3][1], y + directions[3][0]);
  crushByRecursive(map, x + directions[4][1], y + directions[4][0]);
  crushByRecursive(map, x + directions[5][1], y + directions[5][0]);
  crushByRecursive(map, x + directions[6][1], y + directions[6][0]);
  crushByRecursive(map, x + directions[7][1], y + directions[7][0]);
  return;
};

const createBombMap = (map: number[][], x: number, y: number) => {
  if (initializeCount[0] !== 81) return map;
  const bombedMap = plantBombs(map, x, y);
  const numberedMap = determineNumber(bombedMap);
  return numberedMap;
};

const Home = () => {
  const [bombMap, setBombMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [frontBoard, setFrontBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  initializeCount[0] = bombMap.flat().filter((cell) => cell === 0).length;
  const resetButtonHundler = () => {
    resetSomeArray();
    setBombMap(initialArray);
    setFrontBoard(initialArray);
  };

  const clickHundler = (x: number, y: number) => {
    if (finishChecker[0] !== 0) return;
    clickCount[0]++;
    const newBombMap = structuredClone(bombMap);
    const newFrontBoard = structuredClone(frontBoard);
    const reloadedBombMap = createBombMap(newBombMap, x, y);
    const crushedFrontBoard = crushCell(reloadedBombMap, newFrontBoard, x, y);
    setBombMap(reloadedBombMap);
    setFrontBoard(crushedFrontBoard);
  };
  const handleRightClick = (x: number, y: number, event: React.MouseEvent<HTMLDivElement>) => {
    if (finishChecker[0] !== 0) return;
    clickCount[1]++;
    event.preventDefault();
    const newFrontBoard = structuredClone(frontBoard);
    if (newFrontBoard[y][x] === 0) {
      newFrontBoard[y][x] = 1;
    } else if (newFrontBoard[y][x] === 1) {
      newFrontBoard[y][x] = 2;
    } else {
      newFrontBoard[y][x] = 0;
    }
    setFrontBoard(newFrontBoard);
  };
  const newFrontBoard = structuredClone(frontBoard);
  calculateScore(newFrontBoard);

  return (
    <div className={styles.container}>
      <div className={styles.baseDisplayStyle}>
        <div className={styles.informBoardStyle}>
          <div className={styles.numberDisplayLeftStyle}>{bombCount[0] - frontBoardCount[2]}</div>
          <div className={styles.faceButtomBackground} />
          <div className={styles.faceButtom} onClick={() => resetButtonHundler()}>
            <div
              className={styles.faceImageStyle}
              style={{
                backgroundPosition: `-${440 + 40 * faceImage[0]}px 0px`,
              }}
            />
          </div>
          <div className={styles.numberDisplayRightStyle} />
        </div>
        <div className={styles.backBoardStyle}>
          {bombMap.map((row, y) =>
            row.map((color, x) => (
              <div
                className={styles.backCellStyle}
                key={`${x}-${y}`}
                style={{
                  background:
                    y === explodedCell[0][0] && x === explodedCell[0][1] ? '#ff0000' : '#c6c6c6',
                }}
              >
                {color === 1 && (
                  <div className={styles.imageStyle} style={{ backgroundPosition: `-220px 0px` }} />
                )}
                {color === -1 && (
                  <div className={styles.imageStyle} style={{ backgroundPosition: `0px 0px` }} />
                )}
                {color === -2 && (
                  <div className={styles.imageStyle} style={{ backgroundPosition: `-22px 0px` }} />
                )}
                {color === -3 && (
                  <div className={styles.imageStyle} style={{ backgroundPosition: `-44px 0px` }} />
                )}
                {color === -4 && (
                  <div className={styles.imageStyle} style={{ backgroundPosition: `-66px 0px` }} />
                )}
                {color === -5 && (
                  <div className={styles.imageStyle} style={{ backgroundPosition: `-88px 0px` }} />
                )}
                {color === -6 && (
                  <div className={styles.imageStyle} style={{ backgroundPosition: `-110px 0px` }} />
                )}
                {color === -7 && (
                  <div className={styles.imageStyle} style={{ backgroundPosition: `-132px 0px` }} />
                )}
                {color === -8 && (
                  <div className={styles.imageStyle} style={{ backgroundPosition: `-154px 0px` }} />
                )}
                {color === -9 && (
                  <div className={styles.imageStyle} style={{ backgroundPosition: `-240px 0px` }} />
                )}
              </div>
            )),
          )}
        </div>

        <div className={styles.frontBoardStyle}>
          {frontBoard.map((row, y) =>
            row.map((color, x) => (
              <div
                className={styles.blindCellStyle}
                style={{ visibility: color === -1 ? 'hidden' : 'visible' }}
                key={`${x}-${y}`}
                onClick={() => clickHundler(x, y)}
                onContextMenu={(e) => handleRightClick(x, y, e)}
              >
                {color === 1 && (
                  <div className={styles.imageStyle} style={{ backgroundPosition: `-198px 0px` }} />
                )}
                {color === 2 && (
                  <div className={styles.imageStyle} style={{ backgroundPosition: `-176px 0px` }} />
                )}
              </div>
            )),
          )}
        </div>
      </div>
      <div
        className={styles.scoreBoardStyle}
        style={{ visibility: finishChecker[0] !== 0 ? 'visible' : 'hidden' }}
      >
        <div className={styles.scoreBoardStringStyle}>
          クリック数 : {clickCount[0]}+{clickCount[1]}
        </div>
      </div>
    </div>
  );
};
export default Home;
