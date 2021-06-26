import { AnimalDto } from '../../dto/animal/animal.dto';
import { DeleteAnimalDto } from '../../dto/animal/delete-animal.dto';
import { AnimalNotFoundError } from './animal-not-found-error';

export async function deleteAnimal(
  animalInfo: DeleteAnimalDto,
): Promise<AnimalDto | AnimalNotFoundError> {
  throw new Error('Not implemented yet');
}
