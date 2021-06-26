import { ConservationStatusDocument } from '../../models/conservation-status';

interface BaseConservationStatusDtoProps {
  id: string;
  name: string;
  abbreviation: string;
}

export class BaseConservationStatusDto {
  constructor(private props: BaseConservationStatusDtoProps) {}

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

export function conStatusDocumentToBaseDto(
  conStatusDoc: ConservationStatusDocument,
): BaseConservationStatusDto {
  return new BaseConservationStatusDto({
    id: conStatusDoc.id,
    name: conStatusDoc.name,
    abbreviation: conStatusDoc.abbreviation,
  });
}
