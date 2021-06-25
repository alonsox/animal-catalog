import { categoryDocumentToDto, CategoryDto } from '../../dto/category-dto';
import { GetCategoryDto } from '../../dto/get-category-dto';
import { Category, CategoryDocument } from '../../models/category';
import { CategoryNotFoundError } from './errors/category-not-found';

export async function getCategory(
  categoryInfo: GetCategoryDto,
): Promise<CategoryNotFoundError | CategoryDto> {
  const document: CategoryDocument | null = await Category.findById(
    categoryInfo.id,
  ).exec();

  if (!document) {
    return new CategoryNotFoundError(categoryInfo.id);
  }

  return categoryDocumentToDto(document);
}
