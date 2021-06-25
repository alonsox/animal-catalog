import { categoryDocumentToDto, CategoryDto } from '../../dto/category-dto';
import { CreateCategoryDto } from '../../dto/create-category-dto';
import { Category } from '../../models/category';

export async function createCategory(
  categoryInfo: CreateCategoryDto,
): Promise<CategoryDto> {
  const newCategory = new Category(categoryInfo);
  await newCategory.save();

  return categoryDocumentToDto(newCategory);
}
