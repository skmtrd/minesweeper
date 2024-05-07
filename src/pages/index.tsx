import { useState } from 'react';
import styles from './index.module.css';

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
                  <div className={styles.imageStyle} />
                </div>
              </div>
            )),
          )}
        </div>
        <div className={styles.whiteLineBombBottom} />
        <div className={styles.whiteLineBombRight} />
      </div>
      <div className={styles.whiteLineBaseUp} />
      <div className={styles.whiteLineBaseLeft} />
    </div>
  );
};

export default Home;
