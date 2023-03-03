import { Schema, model } from 'mongoose';
import { ICategory } from '../types/category.interface';

const categorySchema = new Schema<ICategory>({
  name: {
    type: String, required: true, unique: true
  },
  description: {
    type: String, required: true, unique: true
  },
  image: String
});

export const Category = model<ICategory>('categories', categorySchema);