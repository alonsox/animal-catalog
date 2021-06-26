import { NextFunction, Request, Response } from 'express';
import { NotFound, UnknownError } from '../../../shared/errors';
import { categoryRoutes, fullRouteOf } from '../../routes/routes.config';
import { CategoryNotFoundError } from '../../use-cases/category/errors/category-not-found';
import { getCategory } from '../../use-cases/category/get-category';

export async function showCategoryDetails(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id: categoryId } = req.params;

  try {
    const result = await getCategory({ id: categoryId });

    if (result instanceof CategoryNotFoundError) {
      next(new NotFound(result.message));
      return;
    }

    // OK
    renderDetailsPage(res, {
      name: result.name,
      description: result.description,
      updateUrl: fullRouteOf(categoryRoutes.update(result.id)),
      deleteUrl: fullRouteOf(categoryRoutes.update(result.id)),
    });
  } catch (err: any) {
    next(
      new UnknownError(
        `Error while getting details of category with ID=${categoryId}`,
      ),
    );
  }
}

interface CategoryDetailsData {
  name: string;
  description: string;
  updateUrl: string;
  deleteUrl: string;
}

function renderDetailsPage(res: Response, data: CategoryDetailsData) {
  res.render('animals/category/category-details', {
    title: `Animal Catalog | ${data.name}`,
    ...data,
  });
}
