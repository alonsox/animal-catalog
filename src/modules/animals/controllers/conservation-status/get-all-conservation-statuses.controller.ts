import { NextFunction, Request, Response } from 'express';
import { UnknownError } from '../../../shared/errors';
import { capitalizeAll } from '../../../shared/utils/formatters';
import { BasicConservationStatusDto } from '../../dto/conservation-status/basic-conservation-status.dto';
import { conStatusesRoutes, fullRouteOf } from '../../routes/routes.config';
import { getAllConservationStatuses } from '../../use-cases/conservation-status/get-all-conservation-statuses';

export async function showAllconservationStatuses(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const statuses = (await getAllConservationStatuses()).map(
      toTemplateConservationStatus,
    );

    // Show conservation statuses
    renderAllStatuses(res, {
      statuses,
    });
  } catch (err: any) {
    next(
      new UnknownError('Error while fetching all conservation statuses', err),
    );
  }
}

interface TemplateConservationStatus {
  name: string;
  updateUrl: string;
  detailsUrl: string;
}

interface AllConStatusesData {
  statuses: TemplateConservationStatus[];
}

function renderAllStatuses(res: Response, data: AllConStatusesData) {
  res.render('animals/conservation-status/conservation-status-list', {
    title: 'Animal Catalog | All conservation statuses',
    ...data,
  });
}

function toTemplateConservationStatus(
  status: BasicConservationStatusDto,
): TemplateConservationStatus {
  return {
    name: capitalizeAll(status.name),
    updateUrl: fullRouteOf(conStatusesRoutes.update(status.id)),
    detailsUrl: fullRouteOf(conStatusesRoutes.getDetails(status.id)),
  };
}
