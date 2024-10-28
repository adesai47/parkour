import { useEffect, useState } from 'react';

interface CannonballProps {
  x: number;
  y: number;
  direction: 'left' | 'right' | 'up' | 'down';
  onCollisionWithPlayer: () => void;
  playerPosition: { x: number; y: number; width: number; height: number };
}

const Cannonball: React.FC<CannonballProps> = ({ x, y, direction, onCollisionWithPlayer, playerPosition }) => {
  const [position, setPosition] = useState({ x, y });
  const speed = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((pos) => ({
        x: pos.x + (direction === 'left' ? -speed : direction === 'right' ? speed : 0),
        y: pos.y + (direction === 'up' ? -speed : direction === 'down' ? speed : 0),
      }));
    }, 30);

    return () => clearInterval(interval);
  }, [direction]);

  useEffect(() => {
    // Check for collision with the player
    const isColliding =
      position.x < playerPosition.x + playerPosition.width &&
      position.x + 10 > playerPosition.x &&
      position.y < playerPosition.y + playerPosition.height &&
      position.y + 10 > playerPosition.y;

    if (isColliding) {
      onCollisionWithPlayer(); // Trigger the lose screen when a collision is detected
    }
  }, [position, playerPosition, onCollisionWithPlayer]);

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: 'red',
      }}
    />
  );
};

export default Cannonball;
