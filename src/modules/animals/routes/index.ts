import { Router } from 'express';
import { categoryRoutes } from './routes.config';
import { validateCreateCategory } from '../validators/category.validators';
import {
  handleCreateCategory,
  showCategoryForm,
} from '../controllers/category/create-category.controller';

const wip = (req: any, res: any) => res.send('Work In Progress');

const animalRoutes = Router();

/*
 * CATEGORIES
 */
animalRoutes.route(categoryRoutes.getAll).get(wip);

animalRoutes.route(categoryRoutes.getSingle).get(wip);

animalRoutes
  .route(categoryRoutes.create)
  .get(showCategoryForm)
  .post(validateCreateCategory(), handleCreateCategory);

animalRoutes.route(categoryRoutes.update).get(wip).post(wip);

animalRoutes.route(categoryRoutes.delete).post(wip);

/**
 * EXPORTS
 */
export { animalRoutes };

export * from './routes.config';
