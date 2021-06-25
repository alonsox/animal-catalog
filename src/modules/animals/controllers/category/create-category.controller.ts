import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UnknownError } from '../../../shared/errors';
import { getErrorMessages } from '../../../shared/utils';
import { categoryRoutes, fullRouteOf } from '../../routes/routes.config';
import { createCategory } from '../../use-cases/category/create-category';
import { CategoryValidationErrors } from '../../validators/category.validators';

// Displays the category create form on GET
export async function showCategoryForm(req: Request, res: Response) {
  renderCategoryForm(res, {
    formTitle: 'Create Category',
  });
}

// Processes the category create form on POST
export async function handleCreateCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // VALIDATE INPUT
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    renderCategoryForm(res, {
      formTitle: 'Create Category',
      name: req.body.name,
      description: req.body.description,
      errors: getErrorMessages<CategoryValidationErrors>(errors),
    });
    return;
  }

  // CREATE CATEGORY
  try {
    await createCategory({
      name: req.body.name,
      description: req.body.description,
    });

    res.redirect(fullRouteOf(categoryRoutes.getAll));
  } catch (err: any) {
    next(new UnknownError('Unknown error while creating a category', err));
  }
}

interface CategoryFormData {
  formTitle?: string; // Update or create
  name?: string; // Category name
  description?: string; // Category description
  errors?: CategoryValidationErrors;
}

function renderCategoryForm(res: Response, data: CategoryFormData = {}) {
  res.render('animals/category/category-form', {
    title: data.formTitle,
    formTitle: data.formTitle || '',
    name: data.name || '',
    description: data.description || '',
    errors: data.errors || {},
  });
}
