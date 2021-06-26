import { Types } from 'mongoose';
import { AnimalDocument } from '../../models/animal';

interface AnimalDtoProps {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  photoSrc?: string;
  /** Only the Id */
  class: string;
  /** Only the Id */
  family: string;
  /** Only the Id */
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

export function toAnimalDto(animal: AnimalDocument): AnimalDto {
  return new AnimalDto({
    id: animal.id,
    name: animal.name,
    scientificName: animal.scientificName,
    description: animal.description,
    photoSrc: animal.photoSrc,
    class: doctoString(animal.class),
    family: doctoString(animal.family),
    status: doctoString(animal.status),
  });
}

function doctoString(x: string | Types.ObjectId) {
  return typeof x === 'string' ? x : x.toHexString();
}
