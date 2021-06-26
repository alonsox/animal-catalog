import { classDocumentToDto, ClassDto } from '../../dto/class/class-dto';
import { UpdateClassDto } from '../../dto/class/update-class-dto';
import { Class } from '../../models/class';
import { ClassNotFoundError } from './errors/class-not-found';

export async function updateClass(
  classInfo: UpdateClassDto,
): Promise<ClassDto | ClassNotFoundError> {
  const { id: classId, ...data } = classInfo;
  try {
    const document = await Class.findByIdAndUpdate(classId, data).exec();

    if (!document) {
      return new ClassNotFoundError(classId);
    }

    return classDocumentToDto(document);
  } catch (err: any) {
    return new ClassNotFoundError(classId);
  }
}
