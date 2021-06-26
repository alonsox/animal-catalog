import { Schema, model } from 'mongoose';
import { familyConstants } from './family-constants';
import { FamilyDocument, FamilyModel } from './family-types';

// SCHEMA
const familySchema = new Schema<FamilyDocument, FamilyModel>({
  name: { type: String },
  description: { type: String },
});

// MODEL
export const Family = model<FamilyDocument, FamilyModel>(
  familyConstants.modelName,
  familySchema,
  familyConstants.collectionName,
);
