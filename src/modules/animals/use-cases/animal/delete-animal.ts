import { AnimalDto } from '../../dto/animal.dto/animal.dto';
import { DeleteAnimalDto } from '../../dto/animal.dto/delete-animal.dto';
import { AnimalNotFoundError } from './animal-not-found-error';

export async function deleteAnimal(
  animalInfo: DeleteAnimalDto,
): Promise<AnimalDto | AnimalNotFoundError> {
  throw new Error('Not implemented yet');
}
