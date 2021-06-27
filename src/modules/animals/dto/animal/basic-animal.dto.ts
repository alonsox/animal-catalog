import { LeanDocument } from 'mongoose';
import { AnimalDocument } from '../../models/animal';

interface BasicAnimalDtoProps {
  id: string;
  name: string;
  scientificName: string;
  photoSrc?: string;
}

export class BasicAnimalDto {
  constructor(private props: BasicAnimalDtoProps) {}

  get id() {
    return this.props.id;
  }

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

export function toBasicAnimalDto(animal: LeanDocument<AnimalDocument>) {
  return new BasicAnimalDto({
    id: animal._id.toString(),
    name: animal.name,
    scientificName: animal.scientificName,
    photoSrc: animal.photoSrc,
  });
}
