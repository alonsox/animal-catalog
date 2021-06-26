interface AnimalDtoProps {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  photoSrc?: string;
  class: string;
  family: string;
  status: string;
}

export class AnimalDto {
  constructor(private props: AnimalDtoProps) {}

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get scientificName() {
    return this.props.scientificName;
  }

  get description() {
    return this.props.description;
  }

  get photoSrc() {
    return this.props.photoSrc;
  }

  get class() {
    return this.props.class;
  }

  get family() {
    return this.props.family;
  }

  get status() {
    return this.props.status;
  }
}
