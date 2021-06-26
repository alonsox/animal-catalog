import { classDocumentToDto, ClassDto } from '../../dto/class/class-dto';
import { DeleteClassDto } from '../../dto/class/delete-class-dto';
import { toPreDeleteClassAnimalDto } from '../../dto/class/pre-delete-class-dto';
import { Animal } from '../../models/animal';
import { Class } from '../../models/class';
import { ClassInUseError } from './errors/class-in-use';
import { ClassNotFoundError } from './errors/class-not-found';

export async function deleteClass(
  classInfo: DeleteClassDto,
): Promise<ClassDto | ClassNotFoundError | ClassInUseError> {
  const { id: classId } = classInfo;

  try {
    const theClass = await Class.findById(classId);

    // Check that it exists
    if (!theClass) {
      return new ClassNotFoundError(classId);
    }

    // Check that is not in use
    const repeatedAnimals = await Animal.find({ class: classId }).lean();
    if (repeatedAnimals.length !== 0) {
      return new ClassInUseError(
        theClass.name,
        repeatedAnimals.map(toPreDeleteClassAnimalDto),
      );
    }

    // All ok
    return classDocumentToDto(await theClass.remove());
  } catch (err: any) {
    return new ClassNotFoundError(classId);
  }
}
