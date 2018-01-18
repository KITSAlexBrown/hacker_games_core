import { Mockgoose } from "mockgoose-fix";
import * as mongoose from "mongoose";

(mongoose as any).Promise = global.Promise;

const mockgoose = new Mockgoose(mongoose);
mockgoose.helper.setDbVersion("3.4.3");

//
mongoose.connect("mongodb://192.168.99.100/db", {
  useMongoClient: true,
});

export { mongoose };