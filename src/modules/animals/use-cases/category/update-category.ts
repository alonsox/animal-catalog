import { categoryDocumentToDto, CategoryDto } from '../../dto/category-dto';
import { UpdateCategoryDto } from '../../dto/update-category-dto';
import { Category } from '../../models/category';
import { CategoryNotFoundError } from './errors/category-not-found';

export async function updateCategory(
  categoryInfo: UpdateCategoryDto,
): Promise<CategoryDto | CategoryNotFoundError> {
  const { id: categoryId, ...data } = categoryInfo;
  try {
    const document = await Category.findByIdAndUpdate(categoryId, data).exec();

    if (!document) {
      return new CategoryNotFoundError(categoryId);
    }

    return categoryDocumentToDto(document);
  } catch (err: any) {
    return new CategoryNotFoundError(categoryId);
  }
}
