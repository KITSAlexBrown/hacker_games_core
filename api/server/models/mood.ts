import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";

// Base model interface
export interface IMood extends Document {
  mood: number;
  create?: Date;
  user: {};
  note: {};
}

// Interaction model
export interface IMoodModel extends Model<IMood> {
  // updateUserCheck(id: {}, date: Date): Promise<{ nModified: number }>
}

// Model Schema
const schema = new Schema({
  mood: Number,
  create: {
      type: Date,
      "default": Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: 'Note',
  }
});

// Export for consumption
export const Mood = mongoose.model<IMood>("Mood", schema) as IMoodModel;
