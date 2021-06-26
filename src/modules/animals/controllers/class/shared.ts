import { Response } from 'express';
import { ClassValidationErrors } from '../../validators/class.validators';

interface ClassFormData {
  formTitle?: string; // Update or create
  name?: string; // Class name
  description?: string; // Class description
  errors?: ClassValidationErrors;
}

export function renderClassForm(res: Response, data: ClassFormData = {}) {
  res.render('animals/class/class-form', {
    title: data.formTitle,
    formTitle: data.formTitle || '',
    name: data.name || '',
    description: data.description || '',
    errors: data.errors || {},
  });
}
