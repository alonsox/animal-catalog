import { Router } from 'express';
import { classRoutes, familyRoutes } from './routes.config';
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
import {
  handleCreateFamily,
  showCreateFamilyForm,
} from '../controllers/family/create-family.controller';
import { validateCreateFamily } from '../validators/family.validators';

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

animalRoutes.route(classRoutes.getDetails()).get(showClassDetails);

animalRoutes.route(classRoutes.getAll()).get(showAllClasses);

/*
 * FAMILIES
 */
const wip = (x: string) => (_: any, res: any) => res.send(`Building ${x}`);

animalRoutes
  .route(familyRoutes.update())
  .get(wip('GET Update Families'))
  .post(wip('POST Update Families'));

animalRoutes
  .route(familyRoutes.delete())
  .get(wip('GET Delete Families'))
  .post(wip('POST Delete Families'));

animalRoutes
  .route(familyRoutes.create())
  .get(showCreateFamilyForm)
  .post(validateCreateFamily(), handleCreateFamily);

animalRoutes.route(familyRoutes.getDetails()).get(wip('GET Single families'));

animalRoutes.route(familyRoutes.getAll()).get(wip('GET All families'));

/**
 * EXPORTS
 */
export { animalRoutes };

export * from './routes.config';
