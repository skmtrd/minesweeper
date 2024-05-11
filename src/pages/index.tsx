import { useEffect, useState } from 'react';
import styles from './index.module.css';
import NumberInput from './NumberInput';

const getRandomIntNumber = (min: number, max: number) => {
  return [
    Math.floor(Math.random() * (max - min + 1)) + min,
    Math.floor(Math.random() * (max - min + 1)) + min,
  ];
};

const createCustomMap = (width: number, height: number) => {
  const customMap = [];
  for (let i = 0; i < height; i++) {
    customMap.push(Array(width).fill(0));
  }
  return customMap;
};
const maps = [
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
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
const imageList = [
  styles.degiNum0,
  styles.degiNum1,
  styles.degiNum2,
  styles.degiNum3,
  styles.degiNum4,
  styles.degiNum5,
  styles.degiNum6,
  styles.degiNum7,
  styles.degiNum8,
  styles.degiNum9,
  styles.degiNum10,
];
const mapWidth = [9];
const mapHeight = [9];
const faceImage = [0];
const finishChecker = [0];
const allBombNum = [10];
const frontBoardCount = [0, 0, 0];
const clickCount: number[] = [0, 0];
const plantPlace: number[][] = [];
const explodedCell: number[][] = [[]];
const initializeCount = [0];
const crushPoint: number[][] = [];
const preBombCount: number[][] = [[0]];
const restBombCount: number[] = [];
const isolatedRestBombCount: string[] = ['', '', ''];
const isolatedSeconds: string[] = ['', '', ''];
const flagMode = [1];
const currentLevel = [0];

const calculateScore = (frontBoard: number[][]) => {
  frontBoardCount[0] = frontBoard.flat().filter((cell) => cell === -1).length;
  frontBoardCount[1] = frontBoard.flat().filter((cell) => cell === 0).length;
  frontBoardCount[2] = frontBoard.flat().filter((cell) => cell === 1).length;
  preBombCount[0][0] = allBombNum[0] - frontBoardCount[2];
  if (
    frontBoardCount[0] + frontBoardCount[1] + frontBoardCount[2] - allBombNum[0] ===
    frontBoardCount[0]
  ) {
    finishChecker[0]++;
    faceImage[0] = 1;
  }
  restBombCount[0] = allBombNum[0] - frontBoardCount[2];
  isolatedRestBombCount.fill('');
  if (restBombCount[0] >= 100) {
    isolatedRestBombCount[0] = String(restBombCount[0])[0];
    isolatedRestBombCount[1] = String(restBombCount[0])[1];
    isolatedRestBombCount[2] = String(restBombCount[0])[2];
  } else if (restBombCount[0] >= 10) {
    isolatedRestBombCount[1] = String(restBombCount[0])[0];
    isolatedRestBombCount[2] = String(restBombCount[0])[1];
  } else if (restBombCount[0] < 10 && restBombCount[0] >= 0) {
    isolatedRestBombCount[2] = String(restBombCount[0])[0];
  } else if (restBombCount[0] > -10) {
    isolatedRestBombCount[1] = '10';
    isolatedRestBombCount[2] = String(restBombCount[0])[1];
  } else {
    isolatedRestBombCount[0] = '10';
    isolatedRestBombCount[1] = String(restBombCount[0])[1];
    isolatedRestBombCount[2] = String(restBombCount[0])[2];
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
  flagMode[0] = 1;
  isolatedSeconds.fill('');
};
const plantBombs = (map: number[][], x: number, y: number) => {
  while (plantPlace.length < allBombNum[0]) {
    const preBombPlace: number[] = getRandomIntNumber(0, mapWidth[0] - 1);
    if (preBombPlace[0] >= mapHeight[0]) continue;
    if (preBombPlace[0] === y && preBombPlace[1] === x) continue;
    const checkOverlap = [0];
    for (const item of plantPlace) {
      if (item[0] === preBombPlace[0] && item[1] === preBombPlace[1]) checkOverlap[0]++;
    }
    if (checkOverlap[0] !== 0) continue;
    plantPlace.push(preBombPlace);
  }
  console.log(plantPlace);
  for (const bomb of plantPlace) {
    map[bomb[0]][bomb[1]] = 1;
  }
  return map;
};

const determineNumber = (map: number[][]) => {
  for (let y = 0; y < mapHeight[0]; y++) {
    for (let x = 0; x < mapWidth[0]; x++) {
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
  if (initializeCount[0] !== mapHeight[0] * mapWidth[0]) return map;
  const bombedMap = plantBombs(map, x, y);
  console.log(bombedMap);
  const numberedMap = determineNumber(bombedMap);
  return numberedMap;
};

const Home = () => {
  const [numberWidth, setNumberWidth] = useState('');
  const [numberHeight, setNumberHeight] = useState('');
  const [numberBomb, setNumberBomb] = useState('');

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const startTimer = () => {
    setIsActive(true);
  };
  const stopTimer = () => {
    setIsActive(false);
  };
  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 0.5);
      }, 500);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    if (seconds >= 100) {
      isolatedSeconds[0] = String(seconds)[0];
      isolatedSeconds[1] = String(seconds)[1];
      isolatedSeconds[2] = String(seconds)[2];
    } else if (seconds >= 10) {
      isolatedSeconds[1] = '0';
      isolatedSeconds[1] = String(seconds)[0];
      isolatedSeconds[2] = String(seconds)[1];
    } else if (seconds >= 0) {
      isolatedSeconds[0] = '0';
      isolatedSeconds[1] = '0';
      isolatedSeconds[2] = String(seconds)[0];
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

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

  const handleNumberChangeWidth = (value: string) => {
    console.log(value);
    setNumberWidth(value);
  };
  const handleNumberChangeHeight = (value: string) => {
    console.log(value);
    setNumberHeight(value);
  };
  const handleNumberChangeBomb = (value: string) => {
    console.log(value);
    setNumberBomb(value);
  };
  const createCustomMapClick = () => {
    if (Number(numberWidth) < 1 || Number(numberHeight) < 1 || Number(numberBomb) < 1) return;
    resetSomeArray();
    stopTimer();
    resetTimer();
    mapWidth[0] = Number(numberWidth);
    mapHeight[0] = Number(numberHeight);
    allBombNum[0] = Number(numberBomb);
    maps[3] = createCustomMap(mapWidth[0], mapHeight[0]);
    setBombMap(maps[3]);
    setFrontBoard(maps[3]);
  };
  const changeLevel = (level: number) => {
    resetSomeArray();
    stopTimer();
    resetTimer();
    currentLevel[0] = level;
    if (level === 0) {
      allBombNum[0] = 10;
      mapWidth[0] = 9;
      mapHeight[0] = 9;
    } else if (level === 1) {
      allBombNum[0] = 40;
      mapWidth[0] = 16;
      mapHeight[0] = 16;
    } else if (level === 2) {
      allBombNum[0] = 99;
      mapWidth[0] = 30;
      mapHeight[0] = 16;
    } else if (level === 3) {
      allBombNum[0] = 150;
      mapWidth[0] = 30;
      mapHeight[0] = 30;
    }
    setBombMap(maps[currentLevel[0]]);
    setFrontBoard(maps[currentLevel[0]]);
  };
  const resetButtonHundler = () => {
    resetSomeArray();
    stopTimer();
    resetTimer();
    setBombMap(maps[currentLevel[0]]);
    setFrontBoard(maps[currentLevel[0]]);
  };

  const toggleFlagMode = () => {
    const newBombMap = structuredClone(bombMap);
    const newFrontBoard = structuredClone(frontBoard);
    flagMode[0] *= -1;
    setBombMap(newBombMap);
    setFrontBoard(newFrontBoard);
  };

  const clickHundler = (x: number, y: number) => {
    startTimer();
    if (finishChecker[0] !== 0) return;
    if (flagMode[0] === -1) {
      handleRightClick(x, y, new MouseEvent('click'));
      return;
    }
    clickCount[0]++;
    const newBombMap = structuredClone(bombMap);
    const newFrontBoard = structuredClone(frontBoard);
    const reloadedBombMap = createBombMap(newBombMap, x, y);
    const crushedFrontBoard = crushCell(reloadedBombMap, newFrontBoard, x, y);
    calculateScore(crushedFrontBoard);
    if (finishChecker[0] !== 0) stopTimer();
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
      <div
        className={styles.numberInputBoxStyle}
        style={{ visibility: currentLevel[0] === 3 ? 'visible' : 'hidden' }}
      >
        <div className={styles.numberInputBoxStringsStyle}>
          <div>幅</div>
          <div>高さ</div>
          <div>爆弾</div>
        </div>
        <NumberInput onChange={handleNumberChangeWidth} />
        <NumberInput onChange={handleNumberChangeHeight} />
        <NumberInput onChange={handleNumberChangeBomb} />
        <div className={styles.refreshButton} onClick={() => createCustomMapClick()}>
          更新
        </div>
      </div>

      <div className={styles.choiceLevel}>
        <div className={styles.choiceLevelStrings} onClick={() => changeLevel(0)}>
          初級
        </div>
        <div className={styles.choiceLevelStrings} onClick={() => changeLevel(1)}>
          中級
        </div>
        <div className={styles.choiceLevelStrings} onClick={() => changeLevel(2)}>
          上級
        </div>
        <div className={styles.choiceLevelStrings} onClick={() => changeLevel(3)}>
          カスタム
        </div>
      </div>
      <div
        className={styles.baseDisplayStyle}
        style={{ width: 50 + 30 * mapWidth[0], height: 150 + 30 * mapHeight[0] }}
      >
        <div className={styles.informBoardStyle} style={{ width: 30 * mapWidth[0] }}>
          <div className={styles.numberDisplayLeftStyle}>
            <div className={imageList[Number(isolatedRestBombCount[0])]} />
            <div className={imageList[Number(isolatedRestBombCount[1])]} />
            <div className={imageList[Number(isolatedRestBombCount[2])]} />
          </div>
          <div className={styles.faceButtomBackground} />
          <div className={styles.faceButtom} onClick={() => resetButtonHundler()}>
            <div
              className={styles.faceImageStyle}
              style={{
                backgroundPosition: `-${440 + 40 * faceImage[0]}px 0px`,
              }}
            />
          </div>
          <div className={styles.numberDisplayRightStyle}>
            <div className={imageList[Number(isolatedSeconds[0])]} />
            <div className={imageList[Number(isolatedSeconds[1])]} />
            <div className={imageList[Number(isolatedSeconds[2])]} />
          </div>
        </div>
        <div
          className={styles.backBoardStyle}
          style={{ width: 30 * mapWidth[0], height: 30 * mapHeight[0] }}
        >
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

        <div
          className={styles.frontBoardStyle}
          style={{ width: 30 * mapWidth[0], height: 30 * mapHeight[0] }}
        >
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
        className={styles.btn}
        onClick={() => toggleFlagMode()}
        style={{
          borderColor: flagMode[0] === 1 ? '' : '#7f7f7f #fff #fff#7f7f7f',
          backgroundColor: flagMode[0] === 1 ? '' : '#a3a3a3',
        }}
      >
        <div className={styles.modeImageStyle} style={{ backgroundPosition: `-198px 0px` }} />
      </div>
      <div
        className={styles.scoreBoardStyle}
        style={{ visibility: finishChecker[0] !== 0 ? 'visible' : 'hidden' }}
      >
        <div className={styles.scoreBoardStringStyle}>
          クリック数 : {clickCount[0]}+{clickCount[1]}
        </div>
        <div className={styles.scoreBoardStringStyle}>タイム : {seconds}秒</div>
      </div>
    </div>
  );
};
export default Home;
