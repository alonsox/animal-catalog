import { Schema, model } from 'mongoose';
import { conservationStatusConstants } from './conservation-status-constants';
import {
  ConservationStatusDocument,
  ConservationStatusModel,
} from './conservation-status-types';

// SCHEMA
const conserStatusSchema = new Schema<
  ConservationStatusDocument,
  ConservationStatusModel
>({
  name: { type: String, required: true },
  abbreviation: { type: String, required: true },
  description: String,
});

// MODEL
export const ConservationStatus = model<
  ConservationStatusDocument,
  ConservationStatusModel
>(
  conservationStatusConstants.modelName,
  conserStatusSchema,
  conservationStatusConstants.collectionName,
);
