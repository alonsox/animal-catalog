import { Animal } from '../../models/animal';
import { Family } from '../../models/family';
import { DeleteFamilyDto } from '../../dto/family/delete-family-dto';
import { familyDocumentToDto, FamilyDto } from '../../dto/family/family-dto';
import { toPreDeleteFamilyAnimalDto } from '../../dto/family/pre-delete-family-dto';
import { FamilyInUseError } from './errors/family-in-use-error';
import { FamilyNotFoundError } from './errors/family-not-found-error';

export async function deleteFamily(
  familyInfo: DeleteFamilyDto,
): Promise<FamilyDto | FamilyNotFoundError | FamilyInUseError> {
  const { id: classId } = familyInfo;

  try {
    const familyDoc = await Family.findById(classId);

    // Check that it exists
    if (!familyDoc) {
      return new FamilyNotFoundError(classId);
    }

    // Check that is not in use
    const repeatedAnimals = await Animal.find({ family: classId }).lean();
    if (repeatedAnimals.length !== 0) {
      return new FamilyInUseError(
        familyDoc.name,
        repeatedAnimals.map(toPreDeleteFamilyAnimalDto),
      );
    }

    // All ok
    return familyDocumentToDto(await familyDoc.remove());
  } catch (err: any) {
    return new FamilyNotFoundError(classId);
  }
}
