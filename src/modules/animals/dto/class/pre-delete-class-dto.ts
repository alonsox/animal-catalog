import { LeanDocument } from 'mongoose';
import { AnimalDocument } from '../../models/animal';

/** Information about the class before it can be deleted */
export interface PreDeleteClassDto {
  /** The class's Id */
  classId: string;

  /** The class's name */
  className: string;

  /** The animals that are associated to that class */
  animals: PreDeleteClassAnimalDto[];
}

/** The information of the animal needed before a class can be deleted */
export interface PreDeleteClassAnimalDto {
  /** The animal's ID */
  id: string;

  /** The name of the animal */
  name: string;
}

export function toPreDeleteClassAnimalDto(
  animal: LeanDocument<AnimalDocument>,
): PreDeleteClassAnimalDto {
  return {
    id: animal._id.toString(),
    name: animal.name,
  };
}
