import {
  PreDeleteCategoryDto,
  toPreDeleteCategoryAnimalDto,
} from '../../dto/pre-delete-category-dto';
import { Animal } from '../../models/animal';
import { Category } from '../../models/category';
import { CategoryNotFoundError } from './errors/category-not-found';

export async function getPreDeleteCategoryData(
  categoryId: string,
): Promise<PreDeleteCategoryDto | CategoryNotFoundError> {
  try {
    const category = await Category.findById(categoryId);

    // Check that it exists
    if (!category) {
      return new CategoryNotFoundError(categoryId);
    }

    // Check that is not in use
    const animalsInUse = await Animal.find({ category: categoryId }).lean();
    if (animalsInUse.length !== 0) {
      return <PreDeleteCategoryDto>{
        categoryId,
        categoryName: category.name,
        animals: animalsInUse.map(toPreDeleteCategoryAnimalDto),
      };
    }

    // All ok
    return <PreDeleteCategoryDto>{
      categoryId,
      categoryName: category.name,
      animals: [],
    };
  } catch (err: any) {
    return new CategoryNotFoundError(categoryId);
  }
}
