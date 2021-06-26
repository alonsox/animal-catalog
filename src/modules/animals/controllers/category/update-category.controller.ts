import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { NotFound, UnknownError } from '../../../shared/errors';
import { getErrorMessages } from '../../../shared/utils';
import { CategoryNotFoundError } from '../../use-cases/category/errors/category-not-found';
import { getCategory } from '../../use-cases/category/get-category';
import { updateCategory } from '../../use-cases/category/update-category';
import { CategoryValidationErrors } from '../../validators/category.validators';
import { renderCategoryForm } from './shared';

const formTitle = 'Update Category';

// Displays the category update form on GET
export async function showUpdateCategoryForm(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const categoryId = req.params.id;
  try {
    // Check category exists
    const result = await getCategory({ id: categoryId });

    if (result instanceof CategoryNotFoundError) {
      next(new NotFound(result.message));
      return;
    }

    // Render form
    renderCategoryForm(res, {
      formTitle,
      name: result.name,
      description: result.description,
    });
  } catch (err: any) {
    next(
      new UnknownError(
        `Unknown error while rendering update category form for category with ID=${categoryId}`,
        err,
      ),
    );
  }
}

// Processes the category update form on POST
export async function handleUpdateCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Validate input
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

  // UPDATE USER
  const categoryId = req.params.id;
  try {
    const result = await updateCategory({
      id: categoryId,
      name: req.body.name,
      description: req.body.description,
    });

    if (result instanceof CategoryNotFoundError) {
      next(new NotFound(result.message));
      return;
    }

    // TODO: redirect to category details
    res.redirect('/catalog/categories');
  } catch (err: any) {
    next(
      new UnknownError(
        `Unknown error while updating user with ID=${categoryId}`,
        err,
      ),
    );
  }
}
