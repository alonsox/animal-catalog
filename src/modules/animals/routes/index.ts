import { Router } from 'express';
import { classRoutes } from './routes.config';
import {
  validateCreateClass,
  validateUpdateClass,
} from '../validators/class.validators';
import {
  handleCreateClass,
  showCreateClassForm,
} from '../controllers/class/create-class.controller';
import {
  handleUpdateClass,
  showUpdateClassForm,
} from '../controllers/class/update-class.controller';
import { showClassDetails } from '../controllers/class/get-class-details.controller';
import { showAllClasses } from '../controllers/class/get-all-classes.controller';
import {
  handleDeleteClass,
  showDeleteClassForm,
} from '../controllers/class/delete-class.controller';

const animalRoutes = Router();

/*
 * CLASSES
 */
animalRoutes
  .route(classRoutes.update())
  .get(showUpdateClassForm)
  .post(validateUpdateClass(), handleUpdateClass);

animalRoutes
  .route(classRoutes.delete())
  .get(showDeleteClassForm)
  .post(handleDeleteClass);

animalRoutes
  .route(classRoutes.create())
  .get(showCreateClassForm)
  .post(validateCreateClass(), handleCreateClass);

animalRoutes.route(classRoutes.getAll()).get(showAllClasses);

animalRoutes.route(classRoutes.getDetails()).get(showClassDetails);

/**
 * EXPORTS
 */
export { animalRoutes };

export * from './routes.config';
