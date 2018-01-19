import { mongoose } from "../config/database";
import { Schema, Document, Model } from "mongoose";

// Base token model
export interface IToken extends Document {
    title: string;
    create: Date;
    user: {},
    token: string;
}

// Create and export the token model
export interface ITokenModel extends Model<IToken> {
    findAllByUser(id: string): Promise<IToken>
}

// Setup the schema
const schema = new Schema({
    title: String,
    create: {
        type: Date,
        "default": Date.now
    },
    expire: {
      type: Date,
      "default": (Date.now() + 600000)
  },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Fetch all tokens for a user
schema.static("findAllByUser", (author: string) => {
    return Post
        .find({ author: author})
        .lean()
        .exec();
});

//
export const Post = mongoose.model<IToken>("Post", schema) as ITokenModel;