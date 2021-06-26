import { Document, Model } from 'mongoose';

export interface ClassFields {
  name: string;
  description: string;
}

export interface ClassDocument extends ClassFields, Document {}

export interface ClassModel extends Model<ClassDocument> {}
