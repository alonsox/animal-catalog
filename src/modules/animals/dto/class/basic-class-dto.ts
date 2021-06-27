import { LeanDocument } from 'mongoose';
import { ClassDocument } from '../../models/class';

interface BasicClassDtoProps {
  id: string;
  name: string;
}

export class BasicClassDto {
  constructor(private props: BasicClassDtoProps) {}

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }
}

/** Converts a lean class document to a DTO */
export function toBasicClassDto(
  classDoc: LeanDocument<ClassDocument>,
): BasicClassDto {
  return new BasicClassDto({
    id: classDoc._id.toString(),
    name: classDoc.name,
  });
}
