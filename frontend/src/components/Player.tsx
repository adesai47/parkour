import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameState } from '../stores/gameState';
import idleImage from '/standing.png';
import runningImage from '/running.png';

interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PlayerProps {
  platforms: Platform[];
  onGameOver: () => void;
  onCoinCollect?: () => void;
}

const Player: React.FC<PlayerProps> = ({ platforms, onGameOver, onCoinCollect }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [velocity, setVelocity] = useState({ x: 0, y: 1 });
  const [canDoubleJump, setCanDoubleJump] = useState(false);
  const [isGrounded, setIsGrounded] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hasCollectedCoin, setHasCollectedCoin] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [facingRight, setFacingRight] = useState(true);

  const playerHeight = 50;
  const playerWidth = 30;

  const speed = 4; // Speed for horizontal movement
  const jumpStrength = 10; // Reduced jump strength for lower jump height
  const gravity = 0.5; // Slightly increased gravity for quicker descent

  const { isGameOver } = useGameState();

  useEffect(() => {
    if (isGameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        setVelocity((v) => ({ ...v, x: speed }));
        setIsMoving(true);
        setFacingRight(true);
      }
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        setVelocity((v) => ({ ...v, x: -speed }));
        setIsMoving(true);
        setFacingRight(false);
      }
      if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') {
        if (isGrounded) {
          setVelocity((v) => ({ ...v, y: -jumpStrength }));
          setIsGrounded(false);
          setCanDoubleJump(true);
        } else if (canDoubleJump) {
          setVelocity((v) => ({ ...v, y: -jumpStrength }));
          setCanDoubleJump(false);
        }
        setIsMoving(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key.toLowerCase() === 'd' || e.key.toLowerCase() === 'a') {
        setVelocity((v) => ({ ...v, x: 0 }));
        setIsMoving(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isGameOver, canDoubleJump, isGrounded]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((pos) => {
        let newY = pos.y + velocity.y;
        let newVelocityY = velocity.y + gravity; // Adjusted gravity for faster jump descent
        let landed = false;

        // Check for platform collisions
        for (const platform of platforms) {
          const isAbovePlatform = newY + playerHeight >= platform.y && newY + playerHeight <= platform.y + platform.height;
          const withinPlatformX = pos.x + playerWidth > platform.x && pos.x < platform.x + platform.width;

          if (isAbovePlatform && withinPlatformX && newVelocityY >= 0) {
            newY = platform.y - playerHeight;
            newVelocityY = 0;
            landed = true;
            break;
          }
        }

        if (landed) {
          setIsGrounded(true);
          setCanDoubleJump(true);
        } else {
          setIsGrounded(false);
        }

        // If the player falls off the screen
        if (newY > window.innerHeight && !gameOver) {
          setGameOver(true);
        }

        return { x: pos.x + velocity.x, y: newY };
      });

      // Update velocity
      setVelocity((v) => ({ ...v, y: Math.min(v.y + gravity, 10) }));
    }, 20);

    return () => clearInterval(interval);
  }, [velocity, platforms, gameOver]);

  // Detect coin collection after position update
  useEffect(() => {
    if (!hasCollectedCoin) {
      const lastPlatform = platforms[platforms.length - 1];
      const coinX = lastPlatform.x + lastPlatform.width / 2 - 15;
      const coinY = lastPlatform.y - 30;
      const coinSize = 30;

      if (
        position.x < coinX + coinSize &&
        position.x + playerWidth > coinX &&
        position.y < coinY + coinSize &&
        position.y + playerHeight > coinY
      ) {
        setHasCollectedCoin(true);
        if (onCoinCollect) onCoinCollect();
      }
    }
  }, [position, hasCollectedCoin, onCoinCollect, platforms, playerWidth, playerHeight]);

  // Trigger onGameOver if gameOver state changes to true
  useEffect(() => {
    if (gameOver) {
      onGameOver();
    }
  }, [gameOver, onGameOver]);

  return (
    <motion.img
      src={isMoving ? runningImage : idleImage}
      alt="Player character"
      style={{
        position: 'absolute',
        width: playerWidth,
        height: playerHeight,
        left: position.x,
        top: position.y,
        transform: `scaleX(${facingRight ? 1 : -1})`,
      }}
    />
  );
};

export default Player;
