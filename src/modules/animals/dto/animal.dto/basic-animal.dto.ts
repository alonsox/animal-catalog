interface BasicAnimalDtoProps {
  id: string;
  name: string;
  scientificName: string;
  photoSrc?: string;
}

export class BasicAnimalDto {
  constructor(private props: BasicAnimalDtoProps) {}

  get name() {
    return this.props.name;
  }

  get scientificName() {
    return this.props.scientificName;
  }

  get photoSrc() {
    return this.props.photoSrc;
  }
}
