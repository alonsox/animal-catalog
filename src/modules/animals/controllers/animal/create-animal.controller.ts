import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UnknownError } from '../../../shared/errors';
import { getErrorMessages } from '../../../shared/utils';
import { animalRoutes, fullRouteOf } from '../../routes/routes.config';
import { createAnimal } from '../../use-cases/animal/create-animal';
import { getAllClasses } from '../../use-cases/class/get-all-classes';
import { getAllConservationStatuses } from '../../use-cases/conservation-status/get-all-conservation-statuses';
import { getAllFamilies } from '../../use-cases/family/get-all-families';
import { AnimalvalidationErrors } from '../../validators/animal.validators';
import { renderAnimalForm } from './shared';

const formTitle = 'Create Animal';

export async function showCreateAnimalForm(req: Request, res: Response) {
  const classes = await getAllClasses();
  const families = await getAllFamilies();
  const statuses = await getAllConservationStatuses();

  renderAnimalForm(res, {
    formTitle,
    classes,
    families,
    statuses,
  });
}

export async function handleCreateAnimal(
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

  // CREATE ANIMAL
  try {
    const newAnimal = await createAnimal({
      name: req.body.name,
      scientificName: req.body.scientificName,
      description: req.body.description,
      photoSrc: req.body.photoSrc,
      class: req.body.class,
      family: req.body.family,
      status: req.body.status,
    });

    res.redirect(fullRouteOf(animalRoutes.getDetails(newAnimal.id)));
  } catch (err: any) {
    next(new UnknownError('Unknown error while creating a animal', err));
  }
}
