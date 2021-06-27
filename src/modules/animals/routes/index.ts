import { Router } from 'express';
import {
  animalRoutes,
  classRoutes,
  conStatusesRoutes,
  familyRoutes,
} from './routes.config';
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
import {
  validateCreateFamily,
  validateUpdateFamily,
} from '../validators/family.validators';
import {
  handleUpdateFamily,
  showUpdateFamilyForm,
} from '../controllers/family/update-family.controller';
import { showFamilyDetails } from '../controllers/family/get-family-details.controllet';
import { showAllFafmilies } from '../controllers/family/get-all-families.controller';
import {
  handleDeleteFamily,
  showDeleteFamilyForm,
} from '../controllers/family/delete-family-controllers';
import { validateUpdateConservationStatus } from '../validators/conservation-status.validator';
import { showAllconservationStatuses } from '../controllers/conservation-status/get-all-conservation-statuses.controller';
import { showConservationStatusDetails } from '../controllers/conservation-status/get-conservation-status-details.controller';
import {
  handleUpdateConservationStatus,
  showUpdateConservationStatusForm,
} from '../controllers/conservation-status/update-conservation-status.controller';
import {
  validateCreateAnimal,
  validateUpdateAnimal,
} from '../validators/animal.validators';
import { showAllAnimals } from '../controllers/animal/get-all-animals.controller';

const catalogRoutes = Router();

/*
 * CLASSES
 */
catalogRoutes
  .route(classRoutes.update())
  .get(showUpdateClassForm)
  .post(validateUpdateClass(), handleUpdateClass);

catalogRoutes
  .route(classRoutes.delete())
  .get(showDeleteClassForm)
  .post(handleDeleteClass);

catalogRoutes
  .route(classRoutes.create())
  .get(showCreateClassForm)
  .post(validateCreateClass(), handleCreateClass);

catalogRoutes.route(classRoutes.getDetails()).get(showClassDetails);

catalogRoutes.route(classRoutes.getAll()).get(showAllClasses);

/*
 * FAMILIES
 */
catalogRoutes
  .route(familyRoutes.delete())
  .get(showDeleteFamilyForm)
  .post(handleDeleteFamily);

catalogRoutes
  .route(familyRoutes.update())
  .get(showUpdateFamilyForm)
  .post(validateUpdateFamily(), handleUpdateFamily);

catalogRoutes
  .route(familyRoutes.create())
  .get(showCreateFamilyForm)
  .post(validateCreateFamily(), handleCreateFamily);

catalogRoutes.route(familyRoutes.getDetails()).get(showFamilyDetails);

catalogRoutes.route(familyRoutes.getAll()).get(showAllFafmilies);

/*
 * CONSERVATION STATUS
 */
catalogRoutes
  .route(conStatusesRoutes.update())
  .get(showUpdateConservationStatusForm)
  .post(validateUpdateConservationStatus(), handleUpdateConservationStatus);

catalogRoutes
  .route(conStatusesRoutes.getDetails())
  .get(showConservationStatusDetails);

catalogRoutes
  .route(conStatusesRoutes.getAll())
  .get(showAllconservationStatuses);

// TODO: Delete the wip
const wip = (x: string) => (_: any, res: any) => res.send(x);

/*
 * ANIMALS
 */
catalogRoutes
  .route(animalRoutes.delete())
  .get(wip('Showing delete animal form...'))
  .post(wip('Deleting animal...'));

catalogRoutes
  .route(animalRoutes.update())
  .get(wip('Showing update animal form...'))
  .post(validateUpdateAnimal(), wip('Updating animal...'));

catalogRoutes
  .route(animalRoutes.create())
  .get(wip('Showing create animal form...'))
  .post(validateCreateAnimal(), wip('Creating animal...'));

catalogRoutes
  .route(animalRoutes.getDetails())
  .get(wip('Getting single animal'));

catalogRoutes.route(animalRoutes.getAll()).get(showAllAnimals);

/**
 * EXPORTS
 */
export { catalogRoutes };

export * from './routes.config';
