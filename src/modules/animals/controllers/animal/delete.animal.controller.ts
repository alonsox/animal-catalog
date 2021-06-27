import { NextFunction, Request, Response } from 'express';
import { NotFound, UnknownError } from '../../../shared/errors';
import { capitalizeAll } from '../../../shared/utils/formatters';
import { animalRoutes, fullRouteOf } from '../../routes/routes.config';
import { AnimalNotFoundError } from '../../use-cases/animal/animal-not-found-error';
import { deleteAnimal } from '../../use-cases/animal/delete-animal';
import { getAnimal } from '../../use-cases/animal/get-animal';

export async function showDeleteAnimalForm(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id: animalId } = req.params;
  try {
    const result = await getAnimal({ id: animalId });

    if (result instanceof AnimalNotFoundError) {
      next(new NotFound(result.message));
    }

    renderAnimalDeleteForm(res, { animalName: capitalizeAll(result.name) });
  } catch (err: any) {
    next(
      new UnknownError(
        `Failed to render the delete form for animal with ID=${animalId}`,
      ),
    );
  }
}

export async function handleDeleteAnimal(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Extract ID
  const { id: animalId } = req.params;

  // Delete family
  const result = await deleteAnimal({ id: animalId });

  if (result instanceof AnimalNotFoundError) {
    next(new NotFound(result.message));
    return;
  }

  // All OK, animal deleted
  res.redirect(fullRouteOf(animalRoutes.getAll()));
}

interface DeleteAnimalData {
  animalName: string;
}

function renderAnimalDeleteForm(res: Response, data: DeleteAnimalData) {
  res.render('animals/animal/animal-delete', {
    title: 'Animal Catalog | Delete Animal',
    ...data,
  });
}
