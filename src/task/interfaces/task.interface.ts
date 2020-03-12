import { Document } from 'mongoose';

export interface Task extends Document {
  readonly name: string;
  readonly createdAt: Date;
  readonly done: boolean;
}
