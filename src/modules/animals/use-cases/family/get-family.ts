import { familyDocumentToDto, FamilyDto } from '../../dto/family/family-dto';
import { GetFamilyDto } from '../../dto/family/get-family-dto';
import { Family } from '../../models/family';
import { FamilyNotFoundError } from './errors/family-not-found-error';

export async function getFamily(
  familyInfo: GetFamilyDto,
): Promise<FamilyDto | FamilyNotFoundError> {
  const { id: classId } = familyInfo;
  try {
    const document = await Family.findById(classId);

    if (!document) {
      return new FamilyNotFoundError(familyInfo.id);
    }

    return familyDocumentToDto(document);
  } catch (err: any) {
    return new FamilyNotFoundError(classId);
  }
}
