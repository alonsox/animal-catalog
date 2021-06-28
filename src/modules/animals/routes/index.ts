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
import {
  handleCreateAnimal,
  showCreateAnimalForm,
} from '../controllers/animal/create-animal.controller';
import { showAnimalDetails } from '../controllers/animal/get-animal-details.controller';
import {
  handleUpdateAnimal,
  showUpdateAnimalForm,
} from '../controllers/animal/update-animal.controller';
import {
  handleDeleteAnimal,
  showDeleteAnimalForm,
} from '../controllers/animal/delete.animal.controller';
import { authenticate, authorize } from '../../security/middleware';

const catalogRoutes = Router();

/*
 * CLASSES
 */
catalogRoutes
  .route(classRoutes.update())
  .get(authorize({ onlyAdmin: true }), showUpdateClassForm)
  .post(
    authorize({ onlyAdmin: true }),
    validateUpdateClass(),
    handleUpdateClass,
  );

catalogRoutes
  .route(classRoutes.delete())
  .get(authorize({ onlyAdmin: true }), showDeleteClassForm)
  .post(authorize({ onlyAdmin: true }), handleDeleteClass);

catalogRoutes
  .route(classRoutes.create())
  .get(authorize({ onlyAdmin: true }), showCreateClassForm)
  .post(
    authorize({ onlyAdmin: true }),
    validateCreateClass(),
    handleCreateClass,
  );

catalogRoutes
  .route(classRoutes.getDetails())
  .get(authenticate(), showClassDetails);

catalogRoutes.route(classRoutes.getAll()).get(authenticate(), showAllClasses);

/*
 * FAMILIES
 */
catalogRoutes
  .route(familyRoutes.delete())
  .get(authorize({ onlyAdmin: true }), showDeleteFamilyForm)
  .post(authorize({ onlyAdmin: true }), handleDeleteFamily);

catalogRoutes
  .route(familyRoutes.update())
  .get(authorize({ onlyAdmin: true }), showUpdateFamilyForm)
  .post(
    authorize({ onlyAdmin: true }),
    validateUpdateFamily(),
    handleUpdateFamily,
  );

catalogRoutes
  .route(familyRoutes.create())
  .get(authorize({ onlyAdmin: true }), showCreateFamilyForm)
  .post(
    authorize({ onlyAdmin: true }),
    validateCreateFamily(),
    handleCreateFamily,
  );

catalogRoutes
  .route(familyRoutes.getDetails())
  .get(authenticate(), showFamilyDetails);

catalogRoutes
  .route(familyRoutes.getAll())
  .get(authenticate(), showAllFafmilies);

/*
 * CONSERVATION STATUS
 */
catalogRoutes
  .route(conStatusesRoutes.update())
  .get(authorize({ onlyAdmin: true }), showUpdateConservationStatusForm)
  .post(
    authorize({ onlyAdmin: true }),
    validateUpdateConservationStatus(),
    handleUpdateConservationStatus,
  );

catalogRoutes
  .route(conStatusesRoutes.getDetails())
  .get(authenticate(), showConservationStatusDetails);

catalogRoutes
  .route(conStatusesRoutes.getAll())
  .get(authenticate(), showAllconservationStatuses);

/*
 * ANIMALS
 */
catalogRoutes
  .route(animalRoutes.delete())
  .get(authorize({ onlyAdmin: true }), showDeleteAnimalForm)
  .post(authorize({ onlyAdmin: true }), handleDeleteAnimal);

catalogRoutes
  .route(animalRoutes.update())
  .get(authorize({ onlyAdmin: true }), showUpdateAnimalForm)
  .post(
    authorize({ onlyAdmin: true }),
    validateUpdateAnimal(),
    handleUpdateAnimal,
  );

catalogRoutes
  .route(animalRoutes.create())
  .get(authorize({ onlyAdmin: true }), showCreateAnimalForm)
  .post(
    authorize({ onlyAdmin: true }),
    validateCreateAnimal(),
    handleCreateAnimal,
  );

catalogRoutes
  .route(animalRoutes.getDetails())
  .get(authenticate(), showAnimalDetails);

catalogRoutes.route(animalRoutes.getAll()).get(authenticate(), showAllAnimals);

/**
 * EXPORTS
 */
export { catalogRoutes };

export * from './routes.config';
