import { NextFunction, Request, Response } from 'express';
import { NotFound } from '../../../shared/errors';
import { PreDeleteCategoryAnimalDto } from '../../dto/pre-delete-category-dto';
import { categoryRoutes, fullRouteOf } from '../../routes/routes.config';
import { deleteCategory } from '../../use-cases/category/delete-category';
import { CategoryInUseError } from '../../use-cases/category/errors/category-in-use';
import { CategoryNotFoundError } from '../../use-cases/category/errors/category-not-found';
import { getCategory } from '../../use-cases/category/get-category';
import { getPreDeleteCategoryData } from '../../use-cases/category/get-pre-delete-category-animals';

export async function showDeleteCategoryForm(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = await getPreDeleteCategoryData(req.params.id);

  // Category not found
  if (result instanceof CategoryNotFoundError) {
    next(new NotFound(result.message));
    return;
  }

  renderDeleteForm(res, {
    categoryName: result.categoryName,
    animals: result.animals.map(toTemplateAnimal),
  });
}

// Processes the category delete form on POST
export async function handleDeleteCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Extract ID
  const { id: categoryId } = req.params;

  // Delete category
  const result = await deleteCategory({ id: categoryId });

  if (result instanceof CategoryNotFoundError) {
    next(new NotFound(result.message));
    return;
  }

  if (result instanceof CategoryInUseError) {
    const category = await getCategory({ id: categoryId });
    renderDeleteForm(res, {
      categoryName: category.name,
      animals: result.animals.map(toTemplateAnimal),
    });
    return;
  }

  // All OK, category deleted
  res.redirect(fullRouteOf(categoryRoutes.getAll()));
}

interface DeleteCategoryData {
  categoryName: string;
  animals: TemplateAnimal[];
}

interface TemplateAnimal {
  name: string;
  detailsUrl: string;
}

function renderDeleteForm(res: Response, data: DeleteCategoryData) {
  res.render('animals/category/category-delete', {
    title: 'Animal Catalog | Delete Animal',
    ...data,
  });
}

function toTemplateAnimal(animal: PreDeleteCategoryAnimalDto) {
  return <TemplateAnimal>{
    name: animal.name,
    detailsUrl: fullRouteOf(categoryRoutes.getSingle(animal.id)),
  };
}
