import { PreDeleteCategoryAnimalDto } from '../../../dto/pre-delete-category-dto';

export class CategoryInUseError extends Error {
  readonly animals: PreDeleteCategoryAnimalDto[];

  constructor(categoryName: string, animals: PreDeleteCategoryAnimalDto[]) {
    super(`The category "${categoryName}" is used by some animals`);

    this.animals = animals;
  }
}
