import { Schema, model } from 'mongoose';
import { classConstants } from './class-constants';
import { ClassDocument, ClassModel } from './class-types';

// SCHEMA
const classSchema = new Schema<ClassDocument, ClassModel>({
  name: { type: String },
  description: { type: String },
});

// MODEL
export const Class = model<ClassDocument, ClassModel>(
  classConstants.modelName,
  classSchema,
  classConstants.collectionName,
);
