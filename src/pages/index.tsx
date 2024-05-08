import { useState } from 'react';
import styles from './index.module.css';

const getRandomIntNumber = (min, max) => {
  return [
    Math.floor(Math.random() * (max - min + 1)) + min,
    Math.floor(Math.random() * (max - min + 1)) + min,
  ];
};

// const ddddddddddddddddddddddddd;

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
    [1, 2, 0, -1, -1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, -1, -1, 0, 0, 0],
    [0, 0, 0, 0, -1, -1, 0, 0, 0],
    [0, 0, 0, 0, -1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const clickHundler = (x: number, y: number) => {};

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
