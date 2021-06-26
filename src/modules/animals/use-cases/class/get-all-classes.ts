import { classDocumentToDto, ClassDto } from '../../dto/class/class-dto';
import { Class } from '../../models/class';

export async function getAllClasses(): Promise<ClassDto[]> {
  const document = await Class.find({}).exec();

  return document.map(classDocumentToDto);
}
