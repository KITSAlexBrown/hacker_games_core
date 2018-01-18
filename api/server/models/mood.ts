import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { Note } from "./index";

// Base model interface
export interface IMood extends Document {
  mood: number;
  create?: Date;
  user: {};
  note: any;
  note_txt: string;
  sentiment_score: number;
  sentiment_positive: Sentiment;
  sentiment_negative: Sentiment;
}

export interface Sentiment extends Document{
  score: number;
  comparative: number;
  words: string[];
}

// Interaction model
export interface IMoodModel extends Model<IMood> {
  // updateUserCheck(id: {}, date: Date): Promise<{ nModified: number }>
}

// Model Schema
const schema = new Schema({
  mood: Number,
  note_txt: String,
  create: {
      type: Date,
      "default": Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

// Export for consumption
export const Mood = mongoose.model<IMood>("Mood", schema) as IMoodModel;
