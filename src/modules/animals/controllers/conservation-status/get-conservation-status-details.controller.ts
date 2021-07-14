import { NextFunction, Request, Response } from 'express';
import { NotFound, UnknownError } from '../../../shared/errors';
import { capitalizeAll, toUpper } from '../../../shared/utils/formatters';
import { markdownToHTML } from '../../../shared/utils/markdown';
import { conStatusesRoutes, fullRouteOf } from '../../routes/routes.config';
import { ConservationStatusNotFoundError } from '../../use-cases/conservation-status/conservation-status-not-found-error';
import { getConservationStatus } from '../../use-cases/conservation-status/get-conservation-status';

export async function showConservationStatusDetails(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id: statusId } = req.params;

  try {
    const result = await getConservationStatus({ id: statusId });

    if (result instanceof ConservationStatusNotFoundError) {
      next(new NotFound(result.message));
      return;
    }

    // OK
    renderStatusDetailsPage(res, {
      name: capitalizeAll(result.name),
      abbreviation: toUpper(result.abbreviation),
      description: markdownToHTML(result.description),
      updateUrl: fullRouteOf(conStatusesRoutes.update(result.id)),
    });
  } catch (err: any) {
    next(
      new UnknownError(
        `Error while getting details of class with ID=${statusId}`,
      ),
    );
  }
}

interface ConStatusDetailsData {
  name: string;
  description: string;
  abbreviation: string;
  updateUrl: string;
}

function renderStatusDetailsPage(res: Response, data: ConStatusDetailsData) {
  res.render('animals/conservation-status/conservation-status-details', {
    title: `Animal Catalog | ${data.name}`,
    ...data,
  });
}
