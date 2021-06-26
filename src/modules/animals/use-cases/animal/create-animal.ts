import { AnimalDto } from '../../dto/animal.dto/animal.dto';
import { CreateAnimalDto } from '../../dto/animal.dto/create-animal.dto';

export async function createAnimal(
  animalInfo: CreateAnimalDto,
): Promise<AnimalDto> {
  throw new Error('Not Implemented yet');
}
