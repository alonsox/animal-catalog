import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UnknownError } from '../../../shared/errors';
import { getErrorMessages } from '../../../shared/utils';
import { classRoutes, fullRouteOf } from '../../routes/routes.config';
import { createClass } from '../../use-cases/class/create-class';
import { ClassValidationErrors } from '../../validators/class.validators';
import { renderClassForm } from './shared';

const formTitle = 'Create Class';

export async function showCreateClassForm(req: Request, res: Response) {
  renderClassForm(res, {
    formTitle,
  });
}

export async function handleCreateClass(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // VALIDATE INPUT
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    renderClassForm(res, {
      formTitle,
      name: req.body.name,
      description: req.body.description,
      errors: getErrorMessages<ClassValidationErrors>(errors),
    });
    return;
  }

  // CREATE CLASS
  try {
    const newClass = await createClass({
      name: req.body.name,
      description: req.body.description,
    });

    res.redirect(fullRouteOf(classRoutes.getDetails(newClass.id)));
  } catch (err: any) {
    next(new UnknownError('Unknown error while creating a class', err));
  }
}
