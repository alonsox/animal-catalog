import { NextFunction, Request, Response } from 'express';
import { UnknownError } from '../../../shared/errors';
import { familyRoutes, fullRouteOf } from '../../routes/routes.config';
import { getAllFamilies } from '../../use-cases/family/get-all-families';

export async function showAllFafmilies(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const families = (await getAllFamilies()).map(
      (family) =>
        <TemplateFamily>{
          name: family.name,
          updateUrl: fullRouteOf(familyRoutes.update(family.id)),
          deleteUrl: fullRouteOf(familyRoutes.delete(family.id)),
          detailsUrl: fullRouteOf(familyRoutes.getDetails(family.id)),
        },
    );

    // Show families
    renderAllFamilies(res, {
      families,
      createUrl: fullRouteOf(familyRoutes.create()),
    });
  } catch (err: any) {
    next(new UnknownError('Error while fetching all families', err));
  }
}

interface TemplateFamily {
  name: string;
  updateUrl: string;
  deleteUrl: string;
  detailsUrl: string;
}

interface AllFamiliesData {
  createUrl: string;
  families: TemplateFamily[];
}

function renderAllFamilies(res: Response, data: AllFamiliesData) {
  res.render('animals/family/family-list', {
    title: 'Animal Catalog | All Families',
    ...data,
  });
}
