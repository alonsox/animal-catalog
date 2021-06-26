import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UnknownError } from '../../../shared/errors';
import { getErrorMessages } from '../../../shared/utils';
import { familyRoutes, fullRouteOf } from '../../routes/routes.config';
import { createFamily } from '../../use-cases/family/create-family';
import { FamilyValidationErrors } from '../../validators/family.validators';
import { renderFamilyForm } from './shared';

const formTitle = 'Create Family';

export async function showCreateFamilyForm(req: Request, res: Response) {
  renderFamilyForm(res, {
    formTitle,
  });
}

export async function handleCreateFamily(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // VALIDATE INPUT
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    renderFamilyForm(res, {
      formTitle,
      name: req.body.name,
      description: req.body.description,
      errors: getErrorMessages<FamilyValidationErrors>(errors),
    });
    return;
  }

  // CREATE FAMILY
  try {
    const newFamily = await createFamily({
      name: req.body.name,
      description: req.body.description,
    });

    res.redirect(fullRouteOf(familyRoutes.getDetails(newFamily.id)));
  } catch (err: any) {
    next(new UnknownError('Unknown error while creating a family', err));
  }
}
