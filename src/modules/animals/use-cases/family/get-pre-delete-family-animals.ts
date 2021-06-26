import {
  PreDeleteFamilyDto,
  toPreDeleteFamilyAnimalDto,
} from '../../dto/family/pre-delete-family-dto';
import { Animal } from '../../models/animal';
import { Family } from '../../models/family';
import { FamilyNotFoundError } from './errors/family-not-found-error';

export async function getPreDeleteFamilyData(
  familyId: string,
): Promise<PreDeleteFamilyDto | FamilyNotFoundError> {
  try {
    const familyDoc = await Family.findById(familyId);

    // Check that it exists
    if (!familyDoc) {
      return new FamilyNotFoundError(familyId);
    }

    // Check that is not in use
    const animalsInUse = await Animal.find({ family: familyId }).lean();
    const animals =
      animalsInUse.length === 0
        ? []
        : animalsInUse.map(toPreDeleteFamilyAnimalDto);

    return <PreDeleteFamilyDto>{
      familyId,
      familyName: familyDoc.name,
      animals,
    };
  } catch (err: any) {
    return new FamilyNotFoundError(familyId);
  }
}
