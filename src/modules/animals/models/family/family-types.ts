import { Document, Model } from 'mongoose';

export interface FamilyFields {
  name: string;
  description: string;
}

export interface FamilyDocument extends FamilyFields, Document {}

export interface FamilyModel extends Model<FamilyDocument> {}
