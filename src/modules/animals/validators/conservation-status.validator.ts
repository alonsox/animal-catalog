import { body } from 'express-validator';
import { ConservationStatus } from '../models/conservation-status';

export interface ConservationStatusValidationErrors {
  name: string;
  abbreviation: string;
  description: string;
}

/*
 * ERROR MESSAGES
 */
const nameErrors = {
  notExists: 'The name must be provided',
  isEmpty: 'The class cannot be empty',
  alreadyExists: 'There is already another class with this name',
};

const abbreviationErrors = {
  notExists: 'The name must be provided',
  isEmpty: 'The conservation status cannot be empty',
  alreadyExists: 'There is already another conservation status with this name',
};

const descriptionErrors = {
  notExists: 'The description must be provided',
  isEmpty: 'The description cannot be empty',
};

/*
 * VALIDATORS
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

  //  ABBREVIATION
  body('abbreviation')
    .exists({ checkNull: true })
    .withMessage(abbreviationErrors.notExists)
    .trim()
    .notEmpty()
    .withMessage(abbreviationErrors.isEmpty)
    .toLowerCase(),

  // DESCRIPTION
  body('description')
    .exists({ checkNull: true })
    .withMessage(descriptionErrors.notExists)
    .trim()
    .notEmpty()
    .withMessage(descriptionErrors.isEmpty),
];

// UPDATE VALIDATORS
export function validateUpdateConservationStatus() {
  return [
    ...baseValidators,
    // NAME
    body('name').custom(async (value, { req }) => {
      const existingStatus = await ConservationStatus.findOne({
        name: value.toLowerCase(),
      }).exec();

      if (!existingStatus) {
        return true;
      }

      const statusBeingUpdatedId = req.params?.id;
      if (statusBeingUpdatedId !== existingStatus.id.toString()) {
        throw new Error(nameErrors.alreadyExists);
      }

      return true;
    }),

    // ABBREVIATION
    body('abbreviation').custom(async (value, { req }) => {
      const existingStatus = await ConservationStatus.findOne({
        name: value.toLowerCase(),
      }).exec();

      if (!existingStatus) {
        return true;
      }

      const statusBeingUpdatedAbbr = req.body.abbreviation;
      if (statusBeingUpdatedAbbr !== existingStatus.abbreviation) {
        throw new Error(abbreviationErrors.alreadyExists);
      }

      return true;
    }),
  ];
}
