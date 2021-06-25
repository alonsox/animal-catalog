import { Schema, model } from 'mongoose';
import { categoryConstants } from './category-constants';
import { CategoryDocument, CategoryModel } from './category-types';

// SCHEMA
const categorySchema = new Schema<CategoryDocument, CategoryModel>({
  name: { type: String },
  description: { type: String },
});

// MODEL
export const Category = model<CategoryDocument, CategoryModel>(
  categoryConstants.modelName,
  categorySchema,
  categoryConstants.collectionName,
);
