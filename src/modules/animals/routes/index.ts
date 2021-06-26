import { Router } from 'express';
import { classRoutes, conStatusesRoutes, familyRoutes } from './routes.config';
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
animalRoutes
  .route(familyRoutes.delete())
  .get(showDeleteFamilyForm)
  .post(handleDeleteFamily);

animalRoutes
  .route(familyRoutes.update())
  .get(showUpdateFamilyForm)
  .post(validateUpdateFamily(), handleUpdateFamily);

animalRoutes
  .route(familyRoutes.create())
  .get(showCreateFamilyForm)
  .post(validateCreateFamily(), handleCreateFamily);

animalRoutes.route(familyRoutes.getDetails()).get(showFamilyDetails);

animalRoutes.route(familyRoutes.getAll()).get(showAllFafmilies);

/*
 * FAMILIES
 */
// TODO: Delete the wip
const wip = (x: string) => (_: any, res: any) => res.send(`Building ${x}`);

animalRoutes
  .route(conStatusesRoutes.update())
  .get(wip('getting con status'))
  .post(validateUpdateConservationStatus(), wip('updating status'));

animalRoutes
  .route(conStatusesRoutes.getDetails())
  .get(showConservationStatusDetails);

animalRoutes.route(conStatusesRoutes.getAll()).get(showAllconservationStatuses);

/**
 * EXPORTS
 */
export { animalRoutes };

export * from './routes.config';
