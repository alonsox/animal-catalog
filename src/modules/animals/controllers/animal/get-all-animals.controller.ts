import { NextFunction, Request, Response } from 'express';
import { UnknownError } from '../../../shared/errors';
import { capitalizeAll, toLower } from '../../../shared/utils/formatters';
import { BasicAnimalDto } from '../../dto/animal/basic-animal.dto';
import { animalRoutes, fullRouteOf } from '../../routes/routes.config';
import { getAllAnimals } from '../../use-cases/animal/get-all-animals';

export async function showAllAnimals(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const animals = (await getAllAnimals()).map(toTemplateAnimal);

    renderAllAnimals(res, {
      animals,
      createUrl: fullRouteOf(animalRoutes.create()),
    });
  } catch (err: any) {
    next(new UnknownError('Error while fetching all animals', err));
  }
}

interface AllAnimalsData {
  createUrl: string;
  animals: TemplateAnimal[];
}

interface TemplateAnimal {
  name: string;
  scientificName: string;
  photoSrc?: string;
  detailsUrl: string;
  updateUrl: string;
  deleteUrl: string;
}

function renderAllAnimals(res: Response, data: AllAnimalsData) {
  res.render('animals/animal/animal-list', {
    title: 'Animal Catalog | All Families',
    ...data,
  });
}

function toTemplateAnimal(animal: BasicAnimalDto): TemplateAnimal {
  return {
    name: capitalizeAll(animal.name),
    scientificName: toLower(animal.scientificName),
    photoSrc: animal.photoSrc,
    deleteUrl: fullRouteOf(animalRoutes.delete(animal.id)),
    updateUrl: fullRouteOf(animalRoutes.update(animal.id)),
    detailsUrl: fullRouteOf(animalRoutes.getDetails(animal.id)),
  };
}
