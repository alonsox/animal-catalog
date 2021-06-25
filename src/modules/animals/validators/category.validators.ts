import { body } from 'express-validator';
import { Category } from '../models/category';

export interface CategoryValidationErrors {
  name: string;
  description: string;
}

/*
 * ERROR MESSAGES
 */
const nameErrors = {
  notExists: 'The name must be provided',
  isEmpty: 'The category cannot be empty',
  alreadyExists: 'There is already another category with this name',
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
export function validateCreateCategory() {
  return [
    ...baseValidators,
    // NAME
    body('name').custom(async (value) => {
      const categoryExists = await Category.exists({
        name: value.toLowerCase(),
      });

      if (categoryExists) {
        throw new Error(nameErrors.alreadyExists);
      }
    }),
  ];
}

// UPDATE VALIDATORS
export function validateUpdateCategory() {
  return [
    ...baseValidators,
    // NAME
    body('name').custom(async (value, { req }) => {
      const existingCategory = await Category.findOne({
        name: value.toLowerCase(),
      }).exec();

      if (!existingCategory) {
        return true;
      }

      const categoryBeingUpdatedId = req.params?.id;
      if (categoryBeingUpdatedId !== existingCategory.id.toString()) {
        throw new Error(nameErrors.alreadyExists);
      }

      return true;
    }),
  ];
}
