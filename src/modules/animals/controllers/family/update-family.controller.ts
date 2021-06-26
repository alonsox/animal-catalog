import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { NotFound, UnknownError } from '../../../shared/errors';
import { getErrorMessages } from '../../../shared/utils';
import { familyRoutes, fullRouteOf } from '../../routes/routes.config';
import { FamilyNotFoundError } from '../../use-cases/family/errors/family-not-found-error';
import { getFamily } from '../../use-cases/family/get-family';
import { updateFamily } from '../../use-cases/family/update-family';
import { FamilyValidationErrors } from '../../validators/family.validators';
import { renderFamilyForm } from './shared';

const formTitle = 'Update Family';

export async function showUpdateFamilyForm(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const familyId = req.params.id;
  try {
    // Check family exists
    const result = await getFamily({ id: familyId });

    if (result instanceof FamilyNotFoundError) {
      next(new NotFound(result.message));
      return;
    }

    // Render form
    renderFamilyForm(res, {
      formTitle,
      name: result.name,
      description: result.description,
    });
  } catch (err: any) {
    next(
      new UnknownError(
        `Unknown error while rendering update family form for family with ID=${familyId}`,
        err,
      ),
    );
  }
}

export async function handleUpdateFamily(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Validate input
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

  // Update family
  const { id: familyId } = req.params;
  try {
    const result = await updateFamily({
      id: familyId,
      name: req.body.name,
      description: req.body.description,
    });

    if (result instanceof FamilyNotFoundError) {
      next(new NotFound(result.message));
      return;
    }

    res.redirect(fullRouteOf(familyRoutes.getDetails(result.id)));
  } catch (err: any) {
    next(
      new UnknownError(
        `Unknown error while updating family with ID=${familyId}`,
        err,
      ),
    );
  }
}
