import { NextFunction, Request, Response } from 'express';
import { NotFound, UnknownError } from '../../../shared/errors';
import { capitalizeAll } from '../../../shared/utils/formatters';
import { familyRoutes, fullRouteOf } from '../../routes/routes.config';
import { FamilyNotFoundError } from '../../use-cases/family/errors/family-not-found-error';
import { getFamily } from '../../use-cases/family/get-family';

export async function showFamilyDetails(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id: classId } = req.params;

  try {
    const result = await getFamily({ id: classId });

    if (result instanceof FamilyNotFoundError) {
      next(new NotFound(result.message));
      return;
    }

    // OK
    renderFamilyDetailsPage(res, {
      name: capitalizeAll(result.name),
      description: result.description,
      updateUrl: fullRouteOf(familyRoutes.update(result.id)),
      deleteUrl: fullRouteOf(familyRoutes.delete(result.id)),
    });
  } catch (err: any) {
    next(
      new UnknownError(
        `Error while getting details of class with ID=${classId}`,
      ),
    );
  }
}

interface FamilyDetailsData {
  name: string;
  description: string;
  updateUrl: string;
  deleteUrl: string;
}

function renderFamilyDetailsPage(res: Response, data: FamilyDetailsData) {
  res.render('animals/family/family-details', {
    title: `Animal Catalog | ${data.name}`,
    ...data,
  });
}
