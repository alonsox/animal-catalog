import { AnimalDto } from '../../dto/animal/animal.dto';
import { UpdateAnimalDto } from '../../dto/animal/update-animal.dto';
import { AnimalNotFoundError } from './animal-not-found-error';

export async function updateAnimal(
  animalInfo: UpdateAnimalDto,
): Promise<AnimalDto | AnimalNotFoundError> {
  throw new Error('Not implemented yet');
}
