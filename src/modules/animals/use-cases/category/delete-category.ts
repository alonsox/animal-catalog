import { categoryDocumentToDto, CategoryDto } from '../../dto/category-dto';
import { DeleteCategoryDto } from '../../dto/delete-category-dto';
import { toPreDeleteCategoryAnimalDto } from '../../dto/pre-delete-category-dto';
import { Animal } from '../../models/animal';
import { Category } from '../../models/category';
import { CategoryInUseError } from './errors/category-in-use';
import { CategoryNotFoundError } from './errors/category-not-found';

export async function deleteCategory(
  categoryInfo: DeleteCategoryDto,
): Promise<CategoryDto | CategoryNotFoundError | CategoryInUseError> {
  const { id: categoryId } = categoryInfo;

  try {
    const category = await Category.findById(categoryId);

    // Check that it exists
    if (!category) {
      return new CategoryNotFoundError(categoryId);
    }

    // Check that is not in use
    const repeatedAnimals = await Animal.find({ category: categoryId }).lean();
    if (repeatedAnimals.length !== 0) {
      return new CategoryInUseError(
        category.name,
        repeatedAnimals.map(toPreDeleteCategoryAnimalDto),
      );
    }

    // All ok
    return categoryDocumentToDto(await category.remove());
  } catch (err: any) {
    return new CategoryNotFoundError(categoryId);
  }
}
