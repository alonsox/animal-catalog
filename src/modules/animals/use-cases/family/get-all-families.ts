import {
  BasicFamilyDto,
  toBasicFamilyDto,
} from '../../dto/family/basic-family-dto';
import { Family } from '../../models/family';

export async function getAllFamilies(): Promise<BasicFamilyDto[]> {
  const documents = await Family.find({}).select('-description').lean();

  return documents.map(toBasicFamilyDto);
}
