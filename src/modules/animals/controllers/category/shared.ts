import { Response } from 'express';
import { CategoryValidationErrors } from '../../validators/category.validators';

interface CategoryFormData {
  formTitle?: string; // Update or create
  name?: string; // Category name
  description?: string; // Category description
  errors?: CategoryValidationErrors;
}

export function renderCategoryForm(res: Response, data: CategoryFormData = {}) {
  res.render('animals/category/category-form', {
    title: data.formTitle,
    formTitle: data.formTitle || '',
    name: data.name || '',
    description: data.description || '',
    errors: data.errors || {},
  });
}
