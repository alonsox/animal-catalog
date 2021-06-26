import { LeanDocument } from 'mongoose';
import { AnimalDocument } from '../../models/animal';

/** Information about the family before it can be deleted */
export interface PreDeleteFamilyDto {
  /** The family's Id */
  familyId: string;

  /** The family's name */
  familyName: string;

  /** The animals that are associated to that family */
  animals: PreDeleteFamilyAnimalDto[];
}

/** The information of the animal needed before a family can be deleted */
export interface PreDeleteFamilyAnimalDto {
  /** The animal's ID */
  id: string;

  /** The name of the animal */
  name: string;
}

export function toPreDeleteFamilyAnimalDto(
  animal: LeanDocument<AnimalDocument>,
): PreDeleteFamilyAnimalDto {
  return {
    id: animal._id.toString(),
    name: animal.name,
  };
}
