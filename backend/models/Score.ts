import mongoose, { Document, Schema } from 'mongoose';

interface IScore extends Document {
  playerName: string;
  score: number;
}

const ScoreSchema = new Schema<IScore>({
  playerName: { type: String, required: true },
  score: { type: Number, required: true },
});

export default mongoose.model<IScore>('Score', ScoreSchema);
