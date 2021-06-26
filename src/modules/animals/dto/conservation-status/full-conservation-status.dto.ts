import { ConservationStatusDocument } from '../../models/conservation-status';

interface FullConservationStatusDtoProps {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
}

export class FullConservationStatusDto {
  constructor(private props: FullConservationStatusDtoProps) {}

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

export function conStatusDocumentToFullDto(
  conStatusDoc: ConservationStatusDocument,
): FullConservationStatusDto {
  return new FullConservationStatusDto({
    id: conStatusDoc.id,
    name: conStatusDoc.name,
    description: conStatusDoc.description,
    abbreviation: conStatusDoc.abbreviation,
  });
}
