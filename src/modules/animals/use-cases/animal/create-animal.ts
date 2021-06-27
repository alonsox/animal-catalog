import { AnimalDto, toAnimalDto } from '../../dto/animal/animal.dto';
import { CreateAnimalDto } from '../../dto/animal/create-animal.dto';
import { Animal } from '../../models/animal';

export async function createAnimal(
  animalInfo: CreateAnimalDto,
): Promise<AnimalDto> {
  const newAnimal = new Animal(animalInfo);
  await newAnimal.save();

  return toAnimalDto(newAnimal);
}
