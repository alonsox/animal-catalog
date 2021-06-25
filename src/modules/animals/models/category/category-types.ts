import { Document, Model } from 'mongoose';

export interface CategoryFields {
  name: string;
  description: string;
}

export interface CategoryDocument extends CategoryFields, Document {}

export interface CategoryModel extends Model<CategoryDocument> {}
