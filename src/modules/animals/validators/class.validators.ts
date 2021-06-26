import { body } from 'express-validator';
import { Class } from '../models/class';

export interface ClassValidationErrors {
  name: string;
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

  // DESCRIPTION
  body('description')
    .exists({ checkNull: true })
    .withMessage(descriptionErrors.notExists)
    .trim()
    .notEmpty()
    .withMessage(descriptionErrors.isEmpty),
];

// NEW VALIDATORS
export function validateCreateClass() {
  return [
    ...baseValidators,
    // NAME
    body('name').custom(async (value) => {
      const classExists = await Class.exists({
        name: value.toLowerCase(),
      });

      if (classExists) {
        throw new Error(nameErrors.alreadyExists);
      }
    }),
  ];
}

// UPDATE VALIDATORS
export function validateUpdateClass() {
  return [
    ...baseValidators,
    // NAME
    body('name').custom(async (value, { req }) => {
      const existingClass = await Class.findOne({
        name: value.toLowerCase(),
      }).exec();

      if (!existingClass) {
        return true;
      }

      const classBeingUpdatedId = req.params?.id;
      if (classBeingUpdatedId !== existingClass.id.toString()) {
        throw new Error(nameErrors.alreadyExists);
      }

      return true;
    }),
  ];
}
