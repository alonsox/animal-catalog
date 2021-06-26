import { PreDeleteFamilyAnimalDto } from '../../../dto/family/pre-delete-family-dto';

export class FamilyInUseError extends Error {
  readonly animals: PreDeleteFamilyAnimalDto[];

  constructor(familyName: string, animals: PreDeleteFamilyAnimalDto[]) {
    super(`The family "${familyName}" is used by some animals`);

    this.animals = animals;
  }
}
