import { Response, NextFunction, Request } from 'express';
import { UnknownError } from '../../../shared/errors';
import { fullRouteOf, categoryRoutes } from '../../routes/routes.config';
import { getAllCategories } from '../../use-cases/category/get-all-categories';

export async function showAllCategories(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const categories = (await getAllCategories()).map(
      (category) =>
        <TemplateCategory>{
          name: category.name,
          updateUrl: fullRouteOf(categoryRoutes.update(category.id)),
          deleteUrl: fullRouteOf(categoryRoutes.delete(category.id)),
          detailsUrl: fullRouteOf(categoryRoutes.getSingle(category.id)),
        },
    );

    // Show categories
    renderAllCategories(res, { categories });
  } catch (err: any) {
    next(new UnknownError('Error while fetching all categories', err));
  }
}

interface TemplateCategory {
  name: string;
  updateUrl: string;
  deleteUrl: string;
  detailsUrl: string;
}

interface AllCatagoriesData {
  categories: TemplateCategory[];
}

function renderAllCategories(res: Response, data: AllCatagoriesData) {
  res.render('animals/category/category-list', {
    title: 'Animal Catalog | All Categories',
    ...data,
  });
}
