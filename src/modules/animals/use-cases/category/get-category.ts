import { categoryDocumentToDto, CategoryDto } from '../../dto/category-dto';
import { GetCategoryDto } from '../../dto/get-category-dto';
import { Category } from '../../models/category';
import { CategoryNotFoundError } from './errors/category-not-found';

export async function getCategory(
  categoryInfo: GetCategoryDto,
): Promise<CategoryNotFoundError | CategoryDto> {
  const { id: categoryId } = categoryInfo;
  try {
    const document = await Category.findById(categoryId);

    if (!document) {
      return new CategoryNotFoundError(categoryInfo.id);
    }

    return categoryDocumentToDto(document);
  } catch (err: any) {
    return new CategoryNotFoundError(categoryId);
  }
}
