import { NextFunction, Request, Response } from 'express';
import { NotFound, UnknownError } from '../../../shared/errors';
import { AnimalDto } from '../../dto/animal/animal.dto';
import { animalRoutes, fullRouteOf } from '../../routes/routes.config';
import { AnimalNotFoundError } from '../../use-cases/animal/animal-not-found-error';
import { getAnimal } from '../../use-cases/animal/get-animal';
import { getClass } from '../../use-cases/class/get-class';
import { getConservationStatus } from '../../use-cases/conservation-status/get-conservation-status';
import { getFamily } from '../../use-cases/family/get-family';

export async function showAnimalDetails(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id: animalId } = req.params;

  try {
    const result = await getAnimal({ id: animalId });

    if (result instanceof AnimalNotFoundError) {
      next(new NotFound(result.message));
      return;
    }

    // OK
    renderAnimalDetails(res, await toAnimalDetails(result));
  } catch (err: any) {
    next(
      new UnknownError(
        `Error while getting details of animal with ID=${animalId}`,
      ),
    );
  }
}

interface AnimalDetailsData {
  name: string;
  scientificName: string;
  description: string;
  phtoSrc?: string;
  className: string;
  familyName: string;
  statusName: string;
  updateUrl: string;
  deleteUrl: string;
}

function renderAnimalDetails(res: Response, data: AnimalDetailsData) {
  res.render('animals/animal/animal-details', {
    title: `Animal Catalog | ${data.name}`,
    ...data,
  });
}

async function toAnimalDetails(animal: AnimalDto): Promise<AnimalDetailsData> {
  const { name: className } = await getClass({ id: animal.class });
  const { name: familyName } = await getFamily({ id: animal.family });
  const { name: statusName } = await getConservationStatus({
    id: animal.status,
  });

  return {
    name: animal.name,
    scientificName: animal.scientificName,
    description: animal.description,
    phtoSrc: animal.photoSrc,
    className,
    familyName,
    statusName,
    updateUrl: fullRouteOf(animalRoutes.update(animal.id)),
    deleteUrl: fullRouteOf(animalRoutes.delete(animal.id)),
  };
}
