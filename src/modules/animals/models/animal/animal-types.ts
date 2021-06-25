import { Document, Model, Types } from 'mongoose';

export interface AnimalFields {
  name: string;
  scientificName: string;
  description: string;
  category: string | Types.ObjectId;
  family: string | Types.ObjectId;
  status: string | Types.ObjectId;
}

export interface AnimalDocument extends AnimalFields, Document {}

export interface AnimalModel extends Model<AnimalDocument> {}
