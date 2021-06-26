import { familyDocumentToDto, FamilyDto } from '../../dto/family/family-dto';
import { UpdateFamilyDto } from '../../dto/family/update-family-dto';
import { Family } from '../../models/family';
import { FamilyNotFoundError } from './errors/family-not-found-error';

export async function updateFamily(
  familyInfo: UpdateFamilyDto,
): Promise<FamilyDto | FamilyNotFoundError> {
  const { id: classId, ...data } = familyInfo;
  try {
    const document = await Family.findByIdAndUpdate(classId, data).exec();

    if (!document) {
      return new FamilyNotFoundError(classId);
    }

    return familyDocumentToDto(document);
  } catch (err: any) {
    return new FamilyNotFoundError(classId);
  }
}
