import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { NotFound, UnknownError } from '../../../shared/errors';
import { getErrorMessages } from '../../../shared/utils';
import { conStatusesRoutes, fullRouteOf } from '../../routes/routes.config';
import { ConservationStatusNotFoundError } from '../../use-cases/conservation-status/conservation-status-not-found-error';
import { getConservationStatus } from '../../use-cases/conservation-status/get-conservation-status';
import { updateConservationStatus } from '../../use-cases/conservation-status/update-conservation-status';
import { ConservationStatusValidationErrors } from '../../validators/conservation-status.validator';
import { renderConservationStatusForm } from './shared';

const formTitle = 'Update Conservation Status';

export async function showUpdateConservationStatusForm(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusId = req.params.id;
  try {
    // Check conservation status exists
    const result = await getConservationStatus({ id: statusId });

    if (result instanceof ConservationStatusNotFoundError) {
      next(new NotFound(result.message));
      return;
    }

    // Render form
    renderConservationStatusForm(res, {
      formTitle,
      name: result.name,
      abbreviation: result.abbreviation,
      description: result.description,
    });
  } catch (err: any) {
    next(
      new UnknownError(
        `Unknown error while rendering update conservation status form for conservation status with ID=${statusId}`,
        err,
      ),
    );
  }
}

export async function handleUpdateConservationStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    renderConservationStatusForm(res, {
      formTitle,
      name: req.body.name,
      abbreviation: req.body.abbreviation,
      description: req.body.description,
      errors: getErrorMessages<ConservationStatusValidationErrors>(errors),
    });
    return;
  }

  // Update conservation status
  const statusId = req.params.id;
  try {
    const result = await updateConservationStatus({
      id: statusId,
      name: req.body.name,
      abbreviation: req.body.abbreviation,
      description: req.body.description,
    });

    if (result instanceof ConservationStatusNotFoundError) {
      next(new NotFound(result.message));
      return;
    }

    res.redirect(fullRouteOf(conStatusesRoutes.getDetails(result.id)));
  } catch (err: any) {
    next(
      new UnknownError(
        `Unknown error while updating conservation status with ID=${statusId}`,
        err,
      ),
    );
  }
}
