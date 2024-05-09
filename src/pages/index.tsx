import { useState } from 'react';
import styles from './index.module.css';

const getRandomIntNumber = (min: number, max: number) => {
  return [
    Math.floor(Math.random() * (max - min + 1)) + min,
    Math.floor(Math.random() * (max - min + 1)) + min,
  ];
};
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
const plantPlace: number[][] = [];
const explodedCell: number[][] = [[]];
const initializeCount = [0];
const plantBombs = (map: number[][], x: number, y: number) => {
  while (plantPlace.length < 10) {
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
    frontBoard[y][x] = -1;
    explodedCell[0] = [y, x];
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
const crushPoint: number[][] = [];
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
  const clickHundler = (x: number, y: number) => {
    console.log('pass');
    const newBombMap = structuredClone(bombMap);
    const newFrontBoard = structuredClone(frontBoard);
    const reloadedBombMap = createBombMap(newBombMap, x, y);
    const crushedFrontBoard = crushCell(reloadedBombMap, newFrontBoard, x, y);
    setBombMap(reloadedBombMap);
    setFrontBoard(crushedFrontBoard);
  };
  const handleRightClick = (x: number, y: number, event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newFrontBoard = structuredClone(frontBoard);
    newFrontBoard[y][x] = frontBoard[y][x] === 0 ? 1 : 0;
    setFrontBoard(newFrontBoard);
  };

  return (
    <div className={styles.container}>
      <div className={styles.baseDisplayStyle}>
        <div className={styles.informBoardStyle} />
        <div className={styles.backBoardStyle}>
          {bombMap.map((row, y) =>
            row.map((color, x) => (
              <div
                className={styles.backCellStyle}
                key={`${x}-${y}`}
                style={{
                  background:
                    y === explodedCell[0][0] && x === explodedCell[0][1] ? '#ff0000' : '7f7f7f',
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
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
