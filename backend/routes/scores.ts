import express, { Request, Response } from 'express';
import Score from '../models/Score';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const scores = await Score.find().sort({ score: -1 }).limit(10);
  res.json(scores);
});

router.post('/', async (req: Request, res: Response) => {
  const { playerName, score } = req.body;
  const newScore = new Score({ playerName, score });
  await newScore.save();
  res.status(201).json(newScore);
});

export default router;
