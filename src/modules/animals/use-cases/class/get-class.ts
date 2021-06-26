import { classDocumentToDto, ClassDto } from '../../dto/class/class-dto';
import { GetClassDto } from '../../dto/class/get-class-dto';
import { Class } from '../../models/class';
import { ClassNotFoundError } from './errors/class-not-found';

export async function getClass(
  classInfo: GetClassDto,
): Promise<ClassNotFoundError | ClassDto> {
  const { id: classId } = classInfo;
  try {
    const document = await Class.findById(classId);

    if (!document) {
      return new ClassNotFoundError(classInfo.id);
    }

    return classDocumentToDto(document);
  } catch (err: any) {
    return new ClassNotFoundError(classId);
  }
}
