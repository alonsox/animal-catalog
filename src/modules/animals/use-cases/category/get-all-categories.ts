import { categoryDocumentToDto, CategoryDto } from '../../dto/category-dto';
import { Category } from '../../models/category';

export async function getAllCategories(): Promise<CategoryDto[]> {
  const document = await Category.find({}).exec();

  return document.map(categoryDocumentToDto);
}
