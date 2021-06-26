import { LeanDocument } from 'mongoose';
import { CategoryDocument } from '../models/category';

/** Information about the category before it can be deleted */
export interface PreDeleteCategoryDto {
  /** The category's Id */
  categoryId: string;

  /** The name of the category */
  categoryName: string;

  /** The animals that are associated to that category */
  animals: PreDeleteCategoryAnimalDto[];
}

/** The information of the animal needed before a category can be deleted */
export interface PreDeleteCategoryAnimalDto {
  /** The animal's ID */
  id: string;

  /** The name of the animal */
  name: string;
}

export function toPreDeleteCategoryAnimalDto(
  animal: LeanDocument<CategoryDocument>,
): PreDeleteCategoryAnimalDto {
  return {
    id: animal._id.toString(),
    name: animal.name,
  };
}
