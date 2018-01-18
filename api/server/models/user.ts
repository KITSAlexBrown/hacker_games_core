import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";

// Base model interface
export interface IUser extends Document {
  age: number;
  name: string;
  create?: Date;
  last_check?: Date;
  credential: string;
  email_address: string;
}

// Interaction model
export interface IUserModel extends Model<IUser> {
  updateUserCheck(id: {}, date: Date): Promise<{ nModified: number }>
}

// Model Schema
const schema = new Schema({
  age: {
    type: Number
  },
  name: {
    type: String,
    required: true
  },
  create: {
    type: Date,
    "default": Date.now
  },
  last_check: {
    type: Date,
  },
  email_address: {
    type: String,
    required: true
  },
  credential: {
    type: String,
    required: true
  }
});

//
schema.static("updateUserCheck", (user: {}, check: Date) => {
  return User
    .update({
      "_id": user
    }, {
      "$set": {
        "last_check": check
      }
    })
    .exec();
});

// Export for consumption
export const User = mongoose.model<IUser>("User", schema) as IUserModel;
