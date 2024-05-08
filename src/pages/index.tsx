import { useState } from 'react';
import styles from './index.module.css';

const getRandomIntNumber = (min, max) => {
  return [
    Math.floor(Math.random() * (max - min + 1)) + min,
    Math.floor(Math.random() * (max - min + 1)) + min,
  ];
};

const Home = () => {
  const [bombMap, setBombMap] = useState([
    [1, -1, -2, -3, -4, -5, -6, -7, -8],
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
              <div className={styles.blindCellStyle} key={`${x}-${y}`}>
                <div className={styles.whiteLineBlindUp} />
                <div className={styles.whiteLineBlindLeft} />
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
