import { LeanDocument } from 'mongoose';
import { ConservationStatusDocument } from '../../models/conservation-status';

interface BasicConservationStatusDtoProps {
  id: string;
  name: string;
  abbreviation: string;
}

export class BasicConservationStatusDto {
  constructor(private props: BasicConservationStatusDtoProps) {}

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get abbreviation() {
    return this.props.abbreviation;
  }
}

export function toBasicConservationStatusDto(
  conStatusDoc: LeanDocument<ConservationStatusDocument>,
): BasicConservationStatusDto {
  return new BasicConservationStatusDto({
    id: conStatusDoc._id.toString(),
    name: conStatusDoc.name,
    abbreviation: conStatusDoc.abbreviation,
  });
}
