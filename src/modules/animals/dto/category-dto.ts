import { CategoryDocument } from '../models/category';

interface CategoryDtoProps {
  id: string;
  name: string;
  description: string;
}

export class CategoryDto {
  constructor(private props: CategoryDtoProps) {}

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }
}

/** Converts a category document to a DTO */
export function categoryDocumentToDto(category: CategoryDocument): CategoryDto {
  return new CategoryDto({
    id: category.id,
    name: category.name,
    description: category.description,
  });
}
