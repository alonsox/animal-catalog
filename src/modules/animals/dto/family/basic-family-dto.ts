import { LeanDocument } from 'mongoose';
import { ClassDocument } from '../../models/class';

interface BasicFamilyDtoProps {
  id: string;
  name: string;
}

export class BasicFamilyDto {
  constructor(private props: BasicFamilyDtoProps) {}

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }
}

export function toBasicFamilyDto(
  familyDoc: LeanDocument<ClassDocument>,
): BasicFamilyDto {
  return new BasicFamilyDto({
    id: familyDoc._id.toString(),
    name: familyDoc.name,
  });
}
