import { AnimalDto, toAnimalDto } from '../../dto/animal/animal.dto';
import { GetAnimalDto } from '../../dto/animal/get-animal.dto';
import { Animal } from '../../models/animal';
import { AnimalNotFoundError } from './animal-not-found-error';

export async function getAnimal(
  animalInfo: GetAnimalDto,
): Promise<AnimalDto | AnimalNotFoundError> {
  const { id: animalId } = animalInfo;
  try {
    const document = await Animal.findById(animalId);

    if (!document) {
      return new AnimalNotFoundError(animalInfo.id);
    }

    return toAnimalDto(document);
  } catch (err: any) {
    return new AnimalNotFoundError(animalId);
  }
}
