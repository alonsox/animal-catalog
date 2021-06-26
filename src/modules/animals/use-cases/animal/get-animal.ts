import { AnimalDto } from '../../dto/animal/animal.dto';
import { GetAnimalDto } from '../../dto/animal/get-animal.dto';
import { AnimalNotFoundError } from './animal-not-found-error';

export async function getAnimal(
  animalInfo: GetAnimalDto,
): Promise<AnimalDto | AnimalNotFoundError> {
  throw new Error('Not implemented yet');
}
