import { ConservationStatusDocument } from '../../models/conservation-status';

interface ConservationStatusDtoProps {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
}

export class ConservationStatusDto {
  constructor(private props: ConservationStatusDtoProps) {}

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get abbreviation() {
    return this.props.abbreviation;
  }
}

export function toConservationStatusDto(
  conStatusDoc: ConservationStatusDocument,
): ConservationStatusDto {
  return new ConservationStatusDto({
    id: conStatusDoc.id,
    name: conStatusDoc.name,
    description: conStatusDoc.description,
    abbreviation: conStatusDoc.abbreviation,
  });
}
