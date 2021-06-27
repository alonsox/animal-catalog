import { ClassDocument } from '../../models/class';

interface FamilyDtoProps {
  id: string;
  name: string;
  description: string;
}

export class FamilyDto {
  constructor(private props: FamilyDtoProps) {}

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

export function toFamilyDto(familyDoc: ClassDocument): FamilyDto {
  return new FamilyDto({
    id: familyDoc.id,
    name: familyDoc.name,
    description: familyDoc.description,
  });
}
