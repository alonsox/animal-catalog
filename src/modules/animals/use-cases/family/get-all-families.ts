import { familyDocumentToDto, FamilyDto } from '../../dto/family/family-dto';
import { Family } from '../../models/family';

export async function getAllFamilies(): Promise<FamilyDto[]> {
  const document = await Family.find({}).exec();

  return document.map(familyDocumentToDto);
}
