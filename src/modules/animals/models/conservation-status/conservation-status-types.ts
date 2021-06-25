import { Document, Model } from 'mongoose';

export interface ConservationoStatusFields {
  name: string;
  abbreviation: string;
  description: string;
}

export interface ConservationStatusDocument
  extends ConservationoStatusFields,
    Document {}

export interface ConservationStatusModel
  extends Model<ConservationStatusDocument> {}
