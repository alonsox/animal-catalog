import { toFamilyDto, FamilyDto } from '../../dto/family/family-dto';
import { UpdateFamilyDto } from '../../dto/family/update-family-dto';
import { Family } from '../../models/family';
import { FamilyNotFoundError } from './errors/family-not-found-error';

export async function updateFamily(
  familyInfo: UpdateFamilyDto,
): Promise<FamilyDto | FamilyNotFoundError> {
  const { id: familyId, ...data } = familyInfo;
  try {
    const document = await Family.findByIdAndUpdate(familyId, data).exec();

    if (!document) {
      return new FamilyNotFoundError(familyId);
    }

    return toFamilyDto(document);
  } catch (err: any) {
    return new FamilyNotFoundError(familyId);
  }
}
