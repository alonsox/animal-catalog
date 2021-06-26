import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { NotFound, UnknownError } from '../../../shared/errors';
import { getErrorMessages } from '../../../shared/utils';
import { ClassNotFoundError } from '../../use-cases/class/errors/class-not-found';
import { getClass } from '../../use-cases/class/get-class';
import { updateClass } from '../../use-cases/class/update-class';
import { ClassValidationErrors } from '../../validators/class.validators';
import { renderClassForm } from './shared';
import { fullRouteOf, classRoutes } from '../../routes/routes.config';

const formTitle = 'Update Class';

export async function showUpdateClassForm(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const classId = req.params.id;
  try {
    // Check class exists
    const result = await getClass({ id: classId });

    if (result instanceof ClassNotFoundError) {
      next(new NotFound(result.message));
      return;
    }

    // Render form
    renderClassForm(res, {
      formTitle,
      name: result.name,
      description: result.description,
    });
  } catch (err: any) {
    next(
      new UnknownError(
        `Unknown error while rendering update class form for class with ID=${classId}`,
        err,
      ),
    );
  }
}

export async function handleUpdateClass(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Validate input
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

  // Update Class
  const classId = req.params.id;
  try {
    const result = await updateClass({
      id: classId,
      name: req.body.name,
      description: req.body.description,
    });

    if (result instanceof ClassNotFoundError) {
      next(new NotFound(result.message));
      return;
    }

    res.redirect(fullRouteOf(classRoutes.getDetails(result.id)));
  } catch (err: any) {
    next(
      new UnknownError(
        `Unknown error while updating class with ID=${classId}`,
        err,
      ),
    );
  }
}
