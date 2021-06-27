import { body } from 'express-validator';
import { Animal } from '../models/animal';
import { Class } from '../models/class';
import { ConservationStatus } from '../models/conservation-status';
import { Family } from '../models/family';

export interface AnimalvalidationErrors {
  name: string;
  scientificName: string;
  description: string;
  class: string;
  family: string;
  status: string;
}

/*
 * ERROR MESSAGES
 */
const nameErrors = {
  notExists: 'The name must be provided',
  isEmpty: 'The animal name cannot be empty',
  alreadyExists: 'There is already another animal with this name',
};

const scientificNameErrors = {
  notExists: 'The scientific name must be provided',
  isEmpty: 'The scientific name cannot be empty',
  alreadyExists: 'There is already another animal with this scientific name',
};

const descriptionErrors = {
  notExists: 'The description must be provided',
  isEmpty: 'The description cannot be empty',
};

const classErrors = {
  notExists: 'The class must be provided',
  isEmpty: 'The class cannot be empty',
  notFound: 'This class does not exists',
};

const familyErrors = {
  notExists: 'The family must be provided',
  isEmpty: 'The family cannot be empty',
  notFound: 'This family does not exists',
};

const statusErrors = {
  notExists: 'The must conservation status be provided',
  isEmpty: 'The conservation status cannot be empty',
  notFound: 'This conservation status does not exists',
};

/*
 *  VALIDATORS
 */
const baseValidators = [
  //  NAME
  body('name')
    .exists({ checkNull: true })
    .withMessage(nameErrors.notExists)
    .trim()
    .notEmpty()
    .withMessage(nameErrors.isEmpty)
    .toLowerCase(),

  // SCIENTIFIC NAME
  body('scientificName')
    .exists({ checkNull: true })
    .withMessage(scientificNameErrors.notExists)
    .trim()
    .notEmpty()
    .withMessage(scientificNameErrors.isEmpty)
    .toLowerCase(),

  // DESCRIPTION
  body('description')
    .exists({ checkNull: true })
    .withMessage(descriptionErrors.notExists)
    .trim()
    .notEmpty()
    .withMessage(descriptionErrors.isEmpty),

  // CLASS
  body('class')
    .exists({ checkNull: true })
    .withMessage(classErrors.notExists)
    .trim()
    .notEmpty()
    .withMessage(classErrors.isEmpty)
    .custom(async (value: string) => {
      const classExists = await Class.exists({ _id: value });

      if (!classExists) {
        throw new Error(classErrors.notFound);
      }
    }),

  // FAMILY
  body('family')
    .exists({ checkNull: true })
    .withMessage(familyErrors.notExists)
    .trim()
    .notEmpty()
    .withMessage(familyErrors.isEmpty)
    .custom(async (value: string) => {
      const familyExists = await Family.exists({ _id: value });

      if (!familyExists) {
        throw new Error(familyErrors.notFound);
      }
    }),

  // CONSERVATION STATUS
  body('status')
    .exists({ checkNull: true })
    .withMessage(statusErrors.notExists)
    .trim()
    .notEmpty()
    .withMessage(statusErrors.isEmpty)
    .custom(async (value: string) => {
      const statusExists = await ConservationStatus.exists({ _id: value });

      if (!statusExists) {
        throw new Error(statusErrors.notFound);
      }
    }),
];

// NEW VALIDATORS
export function validateCreateAnimal() {
  return [
    ...baseValidators,

    //  NAME
    body('name').custom(async (value) => {
      const animalExists = await Animal.exists({
        name: value.toLowerCase(),
      });

      if (animalExists) {
        throw new Error(nameErrors.alreadyExists);
      }
    }),
  ];
}

// UPDATE VALIDATORS
export function validateUpdateAnimal() {
  return [
    ...baseValidators,
    body('name').custom(async (value, { req }) => {
      // TODO: check this
      const existingAnimal = await Animal.findOne(
        {
          name: value.toLowerCase(),
        },
        'name',
      ).exec();

      if (!existingAnimal) {
        return;
      }

      const animalBeingUpdatedId = req.body.updatedAnimalId.toString();
      if (animalBeingUpdatedId !== existingAnimal._id.toString()) {
        throw new Error(nameErrors.alreadyExists);
      }
    }),
  ];
}
