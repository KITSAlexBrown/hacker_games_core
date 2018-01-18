import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";

// Base model interface
export interface INote extends Document {
  note: string;
  create?: Date;
  user: {}
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
  }
});


// Export for consumption
export const User = mongoose.model<INote>("Note", schema) as INoteModel;
