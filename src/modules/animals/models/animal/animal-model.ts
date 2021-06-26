import { Schema, model } from 'mongoose';
import { animalConstants } from './animal-constants';
import { classConstants } from '../class';
import { familyConstants } from '../family';
import { conservationStatusConstants } from '../conservation-status';
import { AnimalDocument, AnimalModel } from './animal-types';

// SCHEMA
const animalSchema = new Schema<AnimalDocument, AnimalModel>({
  name: { type: String },
  scientificName: { type: String },
  description: { type: String },
  photoSrc: { type: String },
  class: {
    type: Schema.Types.ObjectId,
    ref: classConstants.modelName,
  },
  family: {
    type: Schema.Types.ObjectId,
    ref: familyConstants.modelName,
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: conservationStatusConstants.modelName,
  },
});

// MODEL
export const Animal = model<AnimalDocument, AnimalModel>(
  animalConstants.modelName,
  animalSchema,
  animalConstants.collectionName,
);
