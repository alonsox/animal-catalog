import { Router } from 'express';
import {
  handleCreateCategory,
  showCategoryForm,
} from '../controllers/category/create-category.controller';
import { validateCreateCategory } from '../validators/category.validators';

const animalRoutes = Router();

animalRoutes
  .route('/categories/new')
  .get(showCategoryForm)
  .post(validateCreateCategory(), handleCreateCategory);

export { animalRoutes };
