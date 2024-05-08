import { useState } from 'react';
import styles from './index.module.css';
import { setFlagsFromString } from 'v8';

const getRandomIntNumber = (min, max) => {
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

const plantBombs = (map: number[][], x: number, y: number) => {
  const plantPlace: number[][] = [];
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
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ]);

  const clickHundler = (x: number, y: number) => {
    const newBombMap = structuredClone(bombMap);
    const newFrontBoard = structuredClone(frontBoard);
    const plantedBombMap = plantBombs(newBombMap, x, y);
    // console.log(plantedBombMap);
    const reloadedBombMap = determineNumber(plantedBombMap);
    // console.log(reloadedBombMap);
    // setBombMap(plantedBombMap);
    setBombMap(reloadedBombMap);
    setFrontBoard(newFrontBoard);
  };

  return (
    <div className={styles.container}>
      <div className={styles.baseDisplayStyle}>
        <div className={styles.informBoardStyle} />
        <div className={styles.whiteLineInfoBottom} />
        <div className={styles.whiteLineInfoRight} />
        <div className={styles.backBoardStyle}>
          {bombMap.map((row, y) =>
            row.map((color, x) => (
              <div className={styles.cellStyle} key={`${x}-${y}`}>
                <div className={styles.backCellStyle}>
                  {color === 1 && (
                    <div
                      className={styles.imageStyle}
                      style={{ backgroundPosition: `-220px 0px` }}
                    />
                  )}
                  {color === -1 && (
                    <div className={styles.imageStyle} style={{ backgroundPosition: `0px 0px` }} />
                  )}
                  {color === -2 && (
                    <div
                      className={styles.imageStyle}
                      style={{ backgroundPosition: `-22px 0px` }}
                    />
                  )}
                  {color === -3 && (
                    <div
                      className={styles.imageStyle}
                      style={{ backgroundPosition: `-44px 0px` }}
                    />
                  )}
                  {color === -4 && (
                    <div
                      className={styles.imageStyle}
                      style={{ backgroundPosition: `-66px 0px` }}
                    />
                  )}
                  {color === -5 && (
                    <div
                      className={styles.imageStyle}
                      style={{ backgroundPosition: `-88px 0px` }}
                    />
                  )}
                  {color === -6 && (
                    <div
                      className={styles.imageStyle}
                      style={{ backgroundPosition: `-110px 0px` }}
                    />
                  )}
                  {color === -7 && (
                    <div
                      className={styles.imageStyle}
                      style={{ backgroundPosition: `-132px 0px` }}
                    />
                  )}
                  {color === -8 && (
                    <div
                      className={styles.imageStyle}
                      style={{ backgroundPosition: `-154px 0px` }}
                    />
                  )}
                  {color === -9 && (
                    <div
                      className={styles.imageStyle}
                      style={{ backgroundPosition: `-240px 0px` }}
                    />
                  )}
                </div>
              </div>
            )),
          )}
        </div>
        <div className={styles.whiteLineBombBottom} />
        <div className={styles.whiteLineBombRight} />
        <div className={styles.frontBoardStyle}>
          {frontBoard.map((row, y) =>
            row.map((color, x) => (
              <div
                className={styles.blindCellStyle}
                style={{
                  outlineColor: color === -1 ? '#7f7f7f' : '#7f7f7f ',
                  outlineWidth: color === -1 ? '2px' : '3.8px',
                  outlineOffset: color === -1 ? '-1px' : '-3.8px',
                  background: color === -1 ? ' rgba(255, 105, 212, 0)' : 'rgba(198, 198, 198)',
                }}
                key={`${x}-${y}`}
                onClick={() => clickHundler(x, y)}
              >
                {color === 1 && (
                  <div className={styles.imageStyle} style={{ backgroundPosition: `-176px 0px` }} />
                )}
                {color === 2 && (
                  <div className={styles.imageStyle} style={{ backgroundPosition: `-198px 0px` }} />
                )}

                <div
                  className={styles.whiteLineBlindUp}
                  style={{ zIndex: color === -1 ? -1 : 1 }}
                />
                <div
                  className={styles.whiteLineBlindLeft}
                  style={{ zIndex: color === -1 ? -1 : 1 }}
                />
              </div>
            )),
          )}
        </div>
      </div>
      <div className={styles.whiteLineBaseUp} />
      <div className={styles.whiteLineBaseLeft} />
    </div>
  );
};

export default Home;
