import { Response } from 'express';
import { ConservationStatusValidationErrors } from '../../validators/conservation-status.validator';

interface ConservationStatusFormData {
  formTitle?: string; // Update or create
  name?: string;
  abbreviation?: string;
  description?: string;
  errors?: ConservationStatusValidationErrors;
}

export function renderConservationStatusForm(
  res: Response,
  data: ConservationStatusFormData = {},
) {
  res.render('animals/conservation-status/conservation-status-form', {
    title: data.formTitle,
    formTitle: data.formTitle || '',
    name: data.name || '',
    abbreviation: data.abbreviation || '',
    description: data.description || '',
    errors: data.errors || {},
  });
}
