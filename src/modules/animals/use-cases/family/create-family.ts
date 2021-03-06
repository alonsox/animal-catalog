import { CreateFamilyDto } from '../../dto/family/create-family-dto';
import { toFamilyDto, FamilyDto } from '../../dto/family/family-dto';
import { Family } from '../../models/family';

export async function createFamily(
  familyInfo: CreateFamilyDto,
): Promise<FamilyDto> {
  const newFamily = new Family(familyInfo);
  await newFamily.save();

  return toFamilyDto(newFamily);
}
