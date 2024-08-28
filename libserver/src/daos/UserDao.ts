import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../models/User";

export interface IuserModel extends IUser, Document {}

const userSchema = new Schema({
  type: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<IuserModel>("user", userSchema);
