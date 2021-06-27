import { NextFunction, Request, Response } from 'express';
import { NotFound, UnknownError } from '../../../shared/errors';
import { AnimalNotFoundError } from '../../use-cases/animal/animal-not-found-error';
import { getAnimal } from '../../use-cases/animal/get-animal';
import { getAllClasses } from '../../use-cases/class/get-all-classes';
import { getAllConservationStatuses } from '../../use-cases/conservation-status/get-all-conservation-statuses';
import { getAllFamilies } from '../../use-cases/family/get-all-families';
import { renderAnimalForm, toAnimalData } from './shared';

const formTitle = 'Update Animal';

export async function showUpdateAnimalForm(
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
    const classes = await getAllClasses();
    const families = await getAllFamilies();
    const statuses = await getAllConservationStatuses();

    renderAnimalForm(res, {
      formTitle,
      animal: toAnimalData(result),
      classes,
      families,
      statuses,
    });
  } catch (err: any) {
    next(
      new UnknownError(
        `Error while rendering update form for animal with ID="${animalId}"`,
        err,
      ),
    );
  }
}
