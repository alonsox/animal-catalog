import { categoryDocumentToDto, CategoryDto } from '../../dto/category-dto';
import { DeleteCategoryDto } from '../../dto/delete-category-dto';
import { Animal } from '../../models/animal';
import { Category } from '../../models/category';
import { CategoryInUseError } from './errors/category-in-use';
import { CategoryNotFoundError } from './errors/category-not-found';

export async function deleteCategory(
  categoryInfo: DeleteCategoryDto,
): Promise<CategoryDto | CategoryNotFoundError | CategoryInUseError> {
  const { id: categoryId } = categoryInfo;

  const category = await Category.findById(categoryId);

  // Check that it exists
  if (!category) {
    return new CategoryNotFoundError(categoryId);
  }

  // Check that is not in use
  if (await Animal.exists({ category: categoryId })) {
    return new CategoryInUseError(category.name);
  }

  // All ok
  return categoryDocumentToDto(await category.remove());
}
