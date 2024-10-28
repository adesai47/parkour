import { motion } from 'framer-motion';
import { useState } from 'react';

interface CoinProps {
  x: number;
  y: number;
  onCollect: () => void;
}

const Coin: React.FC<CoinProps> = ({ x, y, onCollect }) => {
  const [collected, setCollected] = useState(false);

  const handleCollect = () => {
    setCollected(true);
    onCollect(); // Trigger the collection callback
  };

  return (
    !collected && (
      <motion.img
        src="coin.gif" // Use the path to your GIF file, or replace with the Giphy URL if needed
        alt="Animated Coin"
        onClick={handleCollect} // Optional: allow click to collect
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 40, // Adjust the size of the coin if needed
          height: 40,
          cursor: 'pointer',
        }}
      />
    )
  );
};

export default Coin;
