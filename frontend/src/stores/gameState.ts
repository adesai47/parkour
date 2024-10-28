import { create } from 'zustand';

interface GameState {
  score: number;
  isGameOver: boolean;
  setScore: (points: number) => void;
  gameOver: () => void;
  resetGame: () => void;
}

export const useGameState = create<GameState>((set) => ({
  score: 0,
  isGameOver: false,
  setScore: (points) => set((state) => ({ score: state.score + points })),
  gameOver: () => set({ isGameOver: true }),
  resetGame: () => set({ score: 0, isGameOver: false }),
}));
