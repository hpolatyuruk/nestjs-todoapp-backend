import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
  done: Boolean,
});
