import { useEffect } from 'react';
import Cannonball from './Cannonball';

interface CannonProps {
  x: number;
  y: number;
  direction: 'left' | 'right' | 'up' | 'down';
  onFire: (cannonball: { x: number; y: number; direction: 'left' | 'right' | 'up' | 'down' }) => void;
}

const Cannon: React.FC<CannonProps> = ({ x, y, direction, onFire }) => {
  useEffect(() => {
    // Fire a cannonball every 2 seconds
    const interval = setInterval(() => {
      onFire({ x, y, direction });
    }, 2000);

    return () => clearInterval(interval);
  }, [x, y, direction, onFire]);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: direction === 'up' || direction === 'down' ? 20 : 40, // Adjust size based on direction
        height: direction === 'left' || direction === 'right' ? 20 : 40,
        backgroundColor: 'black',
      }}
    />
  );
};

export default Cannon;
