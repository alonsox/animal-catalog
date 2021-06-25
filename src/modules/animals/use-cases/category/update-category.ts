import { categoryDocumentToDto, CategoryDto } from '../../dto/category-dto';
import { UpdateCategoryDto } from '../../dto/update-category-dto';
import { Category } from '../../models/category';
import { CategoryNotFoundError } from './errors/category-not-found';

export async function updateCategory(
  categoryInfo: UpdateCategoryDto,
): Promise<CategoryDto | CategoryNotFoundError> {
  const { id, ...data } = categoryInfo;

  const document = await Category.findByIdAndUpdate(id, data).exec();

  if (!document) {
    return new CategoryNotFoundError(categoryInfo.id);
  }

  return categoryDocumentToDto(document);
}
