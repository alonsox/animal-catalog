import {
  PreDeleteClassDto,
  toPreDeleteClassAnimalDto,
} from '../../dto/class/pre-delete-class-dto';
import { Animal } from '../../models/animal';
import { Class } from '../../models/class';
import { ClassNotFoundError } from './errors/class-not-found';

export async function getPreDeleteClassData(
  classId: string,
): Promise<PreDeleteClassDto | ClassNotFoundError> {
  try {
    const theClass = await Class.findById(classId);

    // Check that it exists
    if (!theClass) {
      return new ClassNotFoundError(classId);
    }

    // Check that is not in use
    const animalsInUse = await Animal.find({ class: classId }).lean();
    if (animalsInUse.length !== 0) {
      return <PreDeleteClassDto>{
        classId,
        className: theClass.name,
        animals: animalsInUse.map(toPreDeleteClassAnimalDto),
      };
    }

    // All ok
    return <PreDeleteClassDto>{
      classId,
      className: theClass.name,
      animals: [],
    };
  } catch (err: any) {
    return new ClassNotFoundError(classId);
  }
}
