import { Response } from 'express';
import { FamilyValidationErrors } from '../../validators/family.validators';

interface FamilyFormData {
  formTitle?: string; // Update or create
  name?: string; // family name
  description?: string; // family description
  errors?: FamilyValidationErrors;
}

export function renderFamilyForm(res: Response, data: FamilyFormData = {}) {
  res.render('animals/family/family-form', {
    title: data.formTitle || '[Name Missing]',
    formTitle: data.formTitle || '',
    name: data.name || '',
    description: data.description || '',
    errors: data.errors || {},
  });
}
