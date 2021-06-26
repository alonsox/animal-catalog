import { AnimalDto } from '../../dto/animal/animal.dto';
import { CreateAnimalDto } from '../../dto/animal/create-animal.dto';

export async function createAnimal(
  animalInfo: CreateAnimalDto,
): Promise<AnimalDto> {
  throw new Error('Not Implemented yet');
}
