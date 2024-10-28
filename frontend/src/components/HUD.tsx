import { useGameState } from '../stores/gameState';

const HUD = () => {
  const { score, isGameOver } = useGameState();

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, padding: 10, color: 'white', fontSize: '24px' }}>
      <h1>Score: {score}</h1>
      {isGameOver && <h2>Game Over</h2>}
    </div>
  );
};

export default HUD;
