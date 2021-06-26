import { Response, NextFunction, Request } from 'express';
import { UnknownError } from '../../../shared/errors';
import { fullRouteOf, classRoutes } from '../../routes/routes.config';
import { getAllClasses } from '../../use-cases/class/get-all-classes';

export async function showAllClasses(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const classes = (await getAllClasses()).map(
      (theClass) =>
        <TemplateClass>{
          name: theClass.name,
          updateUrl: fullRouteOf(classRoutes.update(theClass.id)),
          deleteUrl: fullRouteOf(classRoutes.delete(theClass.id)),
          detailsUrl: fullRouteOf(classRoutes.getDetails(theClass.id)),
        },
    );

    // Show classes
    renderAllClasses(res, {
      classes,
      createUrl: fullRouteOf(classRoutes.create()),
    });
  } catch (err: any) {
    next(new UnknownError('Error while fetching all classes', err));
  }
}

interface TemplateClass {
  name: string;
  updateUrl: string;
  deleteUrl: string;
  detailsUrl: string;
}

interface AllClassesData {
  createUrl: string;
  classes: TemplateClass[];
}

function renderAllClasses(res: Response, data: AllClassesData) {
  res.render('animals/class/class-list', {
    title: 'Animal Catalog | All Classes',
    ...data,
  });
}
