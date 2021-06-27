import { AnimalDto, toAnimalDto } from '../../dto/animal/animal.dto';
import { DeleteAnimalDto } from '../../dto/animal/delete-animal.dto';
import { Animal } from '../../models/animal';
import { AnimalNotFoundError } from './animal-not-found-error';

export async function deleteAnimal(
  animalInfo: DeleteAnimalDto,
): Promise<AnimalDto | AnimalNotFoundError> {
  const { id: animalId } = animalInfo;

  try {
    const animal = await Animal.findById(animalId);

    // Check that it exists
    if (!animal) {
      return new AnimalNotFoundError(animalId);
    }

    // All ok
    return toAnimalDto(await animal.remove());
  } catch (err: any) {
    return new AnimalNotFoundError(animalId);
  }
}
