import { Router } from 'express';
import { categoryRoutes } from './routes.config';
import {
  validateCreateCategory,
  validateUpdateCategory,
} from '../validators/category.validators';
import {
  handleCreateCategory,
  showCreateCategoryForm,
} from '../controllers/category/create-category.controller';
import {
  handleUpdateCategory,
  showUpdateCategoryForm,
} from '../controllers/category/update-category.controller';
import { showCategoryDetails } from '../controllers/category/get-category.controller';
import { showAllCategories } from '../controllers/category/get-all-categories.controller';

const wip = (req: any, res: any) => res.send('Work In Progress');

const animalRoutes = Router();

/*
 * CATEGORIES
 */
animalRoutes.route(categoryRoutes.getAll).get(showAllCategories);

animalRoutes.route(categoryRoutes.getSingle).get(showCategoryDetails);

animalRoutes
  .route(categoryRoutes.create)
  .get(showCreateCategoryForm)
  .post(validateCreateCategory(), handleCreateCategory);

animalRoutes
  .route(categoryRoutes.update)
  .get(showUpdateCategoryForm)
  .post(validateUpdateCategory(), handleUpdateCategory);

animalRoutes.route(categoryRoutes.delete).post(wip);

/**
 * EXPORTS
 */
export { animalRoutes };

export * from './routes.config';
