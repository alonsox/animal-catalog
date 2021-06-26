import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UnknownError } from '../../../shared/errors';
import { getErrorMessages } from '../../../shared/utils';
import { createCategory } from '../../use-cases/category/create-category';
import { CategoryValidationErrors } from '../../validators/category.validators';
import { renderCategoryForm } from './shared';

const formTitle = 'Create Category';

// Displays the category create form on GET
export async function showCreateCategoryForm(req: Request, res: Response) {
  console.log('Here');

  renderCategoryForm(res, {
    formTitle,
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
      formTitle,
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

    // TODO: Fix this link
    res.redirect('/catalog/categories');
  } catch (err: any) {
    next(new UnknownError('Unknown error while creating a category', err));
  }
}
