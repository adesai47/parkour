import { FC } from 'react';

interface PlatformProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Platform: FC<PlatformProps> = ({ x, y, width, height }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        backgroundColor: 'green',
      }}
    />
  );
};

export default Platform;
