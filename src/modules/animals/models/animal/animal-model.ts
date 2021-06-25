import { Schema, model } from 'mongoose';
import { animalConstants } from './animal-constants';
import { categoryConstants } from '../category';
import { familyConstants } from '../family';
import { conservationStatusConstants } from '../conservation-status';
import { AnimalDocument, AnimalModel } from './animal-types';

// SCHEMA
const animalSchema = new Schema<AnimalDocument, AnimalModel>({
  name: { type: String },
  scientificName: { type: String },
  description: { type: String },
  category: {
    type: Schema.Types.ObjectId,
    ref: categoryConstants.modelName,
  },
  family: {
    type: Schema.Types.ObjectId,
    ref: familyConstants.modelName,
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: conservationStatusConstants.modelName,
    required: true,
  },
});

// MODEL
export const Animal = model<AnimalDocument, AnimalModel>(
  animalConstants.modelName,
  animalSchema,
  animalConstants.collectionName,
);
