import { classDocumentToDto, ClassDto } from '../../dto/class/class-dto';
import { CreateClassDto } from '../../dto/class/create-class-dto';
import { Class } from '../../models/class';

export async function createClass(
  classInfo: CreateClassDto,
): Promise<ClassDto> {
  const newClass = new Class(classInfo);
  await newClass.save();

  return classDocumentToDto(newClass);
}
