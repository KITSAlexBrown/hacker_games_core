import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";

// Base model interface
export interface INote extends Document {
  note: string;
  create?: Date;
  mood: {};
  user: {};
}

// Interaction model
export interface INoteModel extends Model<INote> {
  // updateUserCheck(id: {}, date: Date): Promise<{ nModified: number }>
}

// Model Schema
const schema = new Schema({
  note: String,
  create: {
      type: Date,
      "default": Date.now
  },
  user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  },
  mood: {
    type: Schema.Types.ObjectId,
    ref: 'Mood',
    required: true
}
});

// Export for consumption
export const Note = mongoose.model<INote>("Note", schema) as INoteModel;
