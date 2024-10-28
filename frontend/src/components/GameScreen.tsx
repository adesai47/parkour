import { useState, useEffect } from 'react';
import Player from './Player';
import Platform from './Platform';
import Coin from './Coin';
import Cannon from './Cannon';
import Cannonball from './Cannonball';

const levels = [
  {
    platforms: [
      { x: 50, y: 400, width: 100, height: 20 },
      { x: 200, y: 350, width: 100, height: 20 },
      { x: 350, y: 300, width: 100, height: 20 },
      { x: 500, y: 250, width: 100, height: 20 },
      { x: 650, y: 200, width: 100, height: 20 },
      { x: 800, y: 150, width: 150, height: 20 },
    ],
  },
  {
    platforms: [
      { x: 50, y: 450, width: 80, height: 20 },
      { x: 150, y: 400, width: 70, height: 20 },
      { x: 300, y: 350, width: 60, height: 20 },
      { x: 450, y: 300, width: 50, height: 20 },
      { x: 600, y: 250, width: 40, height: 20 },
      { x: 750, y: 200, width: 100, height: 20 },
    ],
    cannons: [{ x: 700, y: 250, direction: 'left' }],
  },
  {
    platforms: [
      { x: 50, y: 450, width: 80, height: 20 },
      { x: 250, y: 400, width: 70, height: 20 },
      { x: 450, y: 350, width: 60, height: 20 },
      { x: 650, y: 300, width: 60, height: 20 },
      { x: 850, y: 250, width: 60, height: 20 },
      { x: 1050, y: 200, width: 100, height: 20 },
    ],
    cannons: [
      { x: 150, y: 430, direction: 'right' },
      { x: 950, y: 230, direction: 'left' },
      { x: 600, y: 500, direction: 'up' },
    ],
  },
];

const GameScreen = () => {
  const [gameOver, setGameOver] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [cannonballs, setCannonballs] = useState([]);
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50, width: 30, height: 50 });

  const handleGameOver = () => {
    setGameOver(true);
  };

  const handleCoinCollect = () => {
    setLevelComplete(true); // Show "Level Complete" view
  };

  const handleRestartLevel = () => {
    setGameOver(false);
    setLevelComplete(false);
    setCannonballs([]);
  };

  const handleNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel((prevLevel) => prevLevel + 1);
      setGameOver(false);
      setLevelComplete(false);
      setCannonballs([]);
    } else {
      console.log("No more levels!"); // Placeholder for end of game
    }
  };

  const handleFireCannonball = (cannonball) => {
    setCannonballs((prev) => [...prev, cannonball]);
  };

  const handlePlayerCollision = () => {
    setGameOver(true); // Set game over when player is hit by cannonball
  };

  const levelData = levels[currentLevel];
  const { platforms, cannons = [] } = levelData;
  const lastPlatform = platforms[platforms.length - 1];

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#87CEEB' }}>
      {gameOver ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          fontSize: '24px',
        }}>
          <h1>You Lose!</h1>
          <button onClick={handleRestartLevel} style={{
            padding: '10px 20px',
            fontSize: '20px',
            cursor: 'pointer',
            marginTop: '20px',
          }}>Restart</button>
        </div>
      ) : levelComplete ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          fontSize: '24px',
        }}>
          <h1>Level Complete!</h1>
          <button onClick={handleRestartLevel} style={{
            padding: '10px 20px',
            fontSize: '20px',
            cursor: 'pointer',
            marginTop: '20px',
          }}>Restart Level</button>
          <button onClick={handleNextLevel} style={{
            padding: '10px 20px',
            fontSize: '20px',
            cursor: 'pointer',
            marginTop: '10px',
          }}>Next Level</button>
        </div>
      ) : (
        <>
          <Player
            platforms={platforms}
            onGameOver={handleGameOver}
            onCoinCollect={handleCoinCollect}
            setPlayerPosition={setPlayerPosition}
          />
          {platforms.map((platform, index) => (
            <Platform key={index} {...platform} />
          ))}
          <Coin x={lastPlatform.x + lastPlatform.width / 2 - 15} y={lastPlatform.y - 30} onCollect={handleCoinCollect} />
          {cannons.map((cannon, index) => (
            <Cannon key={index} {...cannon} onFire={handleFireCannonball} />
          ))}
          {cannonballs.map((cannonball, index) => (
            <Cannonball
              key={index}
              x={cannonball.x}
              y={cannonball.y}
              direction={cannonball.direction}
              playerPosition={playerPosition}
              onCollisionWithPlayer={handlePlayerCollision}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default GameScreen;
