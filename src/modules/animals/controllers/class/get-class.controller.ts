import { NextFunction, Request, Response } from 'express';
import { NotFound, UnknownError } from '../../../shared/errors';
import { classRoutes, fullRouteOf } from '../../routes/routes.config';
import { ClassNotFoundError } from '../../use-cases/class/errors/class-not-found';
import { getClass } from '../../use-cases/class/get-class';

export async function showClassDetails(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id: classId } = req.params;

  try {
    const result = await getClass({ id: classId });

    if (result instanceof ClassNotFoundError) {
      next(new NotFound(result.message));
      return;
    }

    // OK
    renderClassDetailsPage(res, {
      name: result.name,
      description: result.description,
      updateUrl: fullRouteOf(classRoutes.update(result.id)),
      deleteUrl: fullRouteOf(classRoutes.update(result.id)),
    });
  } catch (err: any) {
    next(
      new UnknownError(
        `Error while getting details of class with ID=${classId}`,
      ),
    );
  }
}

interface ClassDetailsData {
  name: string;
  description: string;
  updateUrl: string;
  deleteUrl: string;
}

function renderClassDetailsPage(res: Response, data: ClassDetailsData) {
  res.render('animals/class/class-details', {
    title: `Animal Catalog | ${data.name}`,
    ...data,
  });
}
