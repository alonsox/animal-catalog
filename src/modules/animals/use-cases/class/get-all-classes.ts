import {
  BasicClassDto,
  toBasicClassDto,
} from '../../dto/class/basic-class-dto';
import { Class } from '../../models/class';

export async function getAllClasses(): Promise<BasicClassDto[]> {
  const documents = await Class.find({}).select('-description').lean();

  return documents.map(toBasicClassDto);
}
