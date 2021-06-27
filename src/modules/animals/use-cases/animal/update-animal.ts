import { AnimalDto, toAnimalDto } from '../../dto/animal/animal.dto';
import { UpdateAnimalDto } from '../../dto/animal/update-animal.dto';
import { Animal } from '../../models/animal';
import { AnimalNotFoundError } from './animal-not-found-error';

export async function updateAnimal(
  animalInfo: UpdateAnimalDto,
): Promise<AnimalDto | AnimalNotFoundError> {
  const { id: animalId, ...data } = animalInfo;
  try {
    const animal = await Animal.findByIdAndUpdate(animalId, data).exec();

    if (!animal) {
      return new AnimalNotFoundError(animalId);
    }

    return toAnimalDto(animal);
  } catch (err: any) {
    return new AnimalNotFoundError(animalId);
  }
}
