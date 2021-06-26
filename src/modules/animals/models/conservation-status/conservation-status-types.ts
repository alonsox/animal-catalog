import { Document, Model } from 'mongoose';

export interface ConservationStatusFields {
  name: string;
  abbreviation: string;
  description: string;
}

export interface ConservationStatusDocument
  extends ConservationStatusFields,
    Document {}

export interface ConservationStatusModel
  extends Model<ConservationStatusDocument> {}
