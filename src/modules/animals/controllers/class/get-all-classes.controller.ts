import { Response, NextFunction, Request } from 'express';
import { UnknownError } from '../../../shared/errors';
import { capitalizeAll } from '../../../shared/utils/formatters';
import { BasicClassDto } from '../../dto/class/basic-class-dto';
import { fullRouteOf, classRoutes } from '../../routes/routes.config';
import { getAllClasses } from '../../use-cases/class/get-all-classes';

export async function showAllClasses(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const classes = (await getAllClasses()).map(toTemplateClass);

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

function toTemplateClass(theClass: BasicClassDto): TemplateClass {
  return {
    name: capitalizeAll(theClass.name),
    updateUrl: fullRouteOf(classRoutes.update(theClass.id)),
    deleteUrl: fullRouteOf(classRoutes.delete(theClass.id)),
    detailsUrl: fullRouteOf(classRoutes.getDetails(theClass.id)),
  };
}

function renderAllClasses(res: Response, data: AllClassesData) {
  res.render('animals/class/class-list', {
    title: 'Animal Catalog | All Classes',
    ...data,
  });
}
