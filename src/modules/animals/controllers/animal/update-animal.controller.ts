import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { NotFound, UnknownError } from '../../../shared/errors';
import { getErrorMessages } from '../../../shared/utils';
import { animalRoutes, fullRouteOf } from '../../routes/routes.config';
import { AnimalNotFoundError } from '../../use-cases/animal/animal-not-found-error';
import { getAnimal } from '../../use-cases/animal/get-animal';
import { updateAnimal } from '../../use-cases/animal/update-animal';
import { getAllClasses } from '../../use-cases/class/get-all-classes';
import { getAllConservationStatuses } from '../../use-cases/conservation-status/get-all-conservation-statuses';
import { getAllFamilies } from '../../use-cases/family/get-all-families';
import { AnimalvalidationErrors } from '../../validators/animal.validators';
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

export async function handleUpdateAnimal(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // VALIDATE INPUT
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const classes = await getAllClasses();
    const families = await getAllFamilies();
    const statuses = await getAllConservationStatuses();

    renderAnimalForm(res, {
      formTitle,
      animal: {
        name: req.body.name,
        scientificName: req.body.scientificName,
        description: req.body.description,
        photoSrc: req.body.photoSrc,
        classId: req.body.class,
        familyId: req.body.family,
        statusId: req.body.status,
      },
      classes,
      families,
      statuses,
      errors: getErrorMessages<AnimalvalidationErrors>(errors),
    });
    return;
  }

  // UPDATE ANIMAL
  const { id: updateId } = req.params;
  try {
    const result = await updateAnimal({
      id: updateId,
      name: req.body.name,
      scientificName: req.body.scientificName,
      description: req.body.description,
      photoSrc: req.body.photoSrc,
      class: req.body.class,
      family: req.body.family,
      status: req.body.status,
    });

    if (result instanceof AnimalNotFoundError) {
      next(new NotFound(result.message));
      return;
    }

    res.redirect(fullRouteOf(animalRoutes.getDetails(result.id)));
  } catch (err: any) {
    next(
      new UnknownError(
        `Unknown error while updating animal with ID=${updateId}`,
        err,
      ),
    );
  }
}
