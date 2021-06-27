import {
  BasicAnimalDto,
  toBasicAnimalDto,
} from '../../dto/animal/basic-animal.dto';
import { Animal } from '../../models/animal';

export async function getAllAnimals(): Promise<BasicAnimalDto[]> {
  const animals = await Animal.find({})
    .select('name scientificName photoSrc')
    .lean();

  return animals.map(toBasicAnimalDto);
}
