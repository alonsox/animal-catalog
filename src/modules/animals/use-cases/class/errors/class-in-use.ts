import { PreDeleteClassAnimalDto } from '../../../dto/class/pre-delete-class-dto';

export class ClassInUseError extends Error {
  readonly animals: PreDeleteClassAnimalDto[];

  constructor(className: string, animals: PreDeleteClassAnimalDto[]) {
    super(`The class "${className}" is used by some animals`);

    this.animals = animals;
  }
}
