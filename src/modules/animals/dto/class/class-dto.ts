import { ClassDocument } from '../../models/class';

interface ClassDtoProps {
  id: string;
  name: string;
  description: string;
}

export class ClassDto {
  constructor(private props: ClassDtoProps) {}

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

/** Converts a class document to a DTO */
export function toClassDto(classDoc: ClassDocument): ClassDto {
  return new ClassDto({
    id: classDoc._id,
    name: classDoc.name,
    description: classDoc.description,
  });
}
