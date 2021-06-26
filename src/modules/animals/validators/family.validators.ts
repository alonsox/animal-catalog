import { body } from 'express-validator';
import { Family } from '../models/family';

export interface FamilyValidationErrors {
  name: string;
  description: string;
}

/*
 * ERROR MESSAGES
 */
const nameErrors = {
  notExists: 'The name must be provided',
  isEmpty: 'The family cannot be empty',
  alreadyExists: 'There is already another family with this name',
};

const descriptionErrors = {
  notExists: 'The description must be provided',
  isEmpty: 'The description cannot be empty',
};

const baseValidators = [
  //  NAME
  body('name')
    .exists({ checkNull: true })
    .withMessage(nameErrors.notExists)
    .trim()
    .notEmpty()
    .withMessage(nameErrors.isEmpty),

  // DESCRIPTION
  body('description')
    .exists({ checkNull: true })
    .withMessage(descriptionErrors.notExists)
    .trim()
    .notEmpty()
    .withMessage(descriptionErrors.isEmpty),
];

// CREATE VALIDATORS
export function validateCreateFamily() {
  return [
    ...baseValidators,
    // NAME
    body('name').custom(async (value) => {
      const familyExists = await Family.exists({
        name: value.toLowerCase(),
      });

      if (familyExists) {
        throw new Error(nameErrors.alreadyExists);
      }
    }),
  ];
}
// UPDATE VALIDATORS
export function validateUpdateFamily() {
  return [
    ...baseValidators,
    // NAME
    body('name').custom(async (value, { req }) => {
      const existingFamily = await Family.findOne({
        name: value.toLowerCase(),
      }).exec();

      if (!existingFamily) {
        return;
      }

      const familyBeingUpdatedId = req.params?.id.toString();
      if (familyBeingUpdatedId !== existingFamily._id.toString()) {
        throw new Error(nameErrors.alreadyExists);
      }
    }),
  ];
}
