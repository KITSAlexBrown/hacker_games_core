import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { Note } from "./index";

// Base model interface
export interface IMood extends Document {
  mood: number;
  create?: Date;
  create_pretty?: String;
  user: {};
  note: any;
  note_txt: string;
  sentiment_score: number;
  sentiment_positive: string[];
  sentiment_negative: string[];
}

//
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
      default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sentiment_score: Number,
  sentiment_positive: [String],
  sentiment_negative: [String]
});

//

schema.virtual('create_pretty')
.get(function() {
  return "weofghewfiouhewf"
  // return this._id.generationTime.toDateString();
});

// Export for consumption
export const Mood = mongoose.model<IMood>("Mood", schema) as IMoodModel;
