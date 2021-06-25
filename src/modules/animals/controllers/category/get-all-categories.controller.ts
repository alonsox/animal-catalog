import { Response, NextFunction, Request } from 'express';
import { UnknownError } from '../../../shared/errors';
import { getAllCategories } from '../../use-cases/category/get-all-categories';

export async function showAllCategories(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // TODO: Fix the URLS
    const categories = (await getAllCategories()).map(
      (c) =>
        <TemplateCategory>{
          name: c.name,
          updateUrl: `/animals/catalog/categories/update/${c.id}`,
          deleteUrl: `/animals/catalog/categories/delete/${c.id}`,
          detailsUrl: `/animals/catalog/categories/${c.id}`,
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
