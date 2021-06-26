import { NextFunction, Request, Response } from 'express';
import { NotFound } from '../../../shared/errors';
import { PreDeleteFamilyAnimalDto } from '../../dto/family/pre-delete-family-dto';
import { familyRoutes, fullRouteOf } from '../../routes/routes.config';
import { deleteFamily } from '../../use-cases/family/delete-family';
import { FamilyInUseError } from '../../use-cases/family/errors/family-in-use-error';
import { FamilyNotFoundError } from '../../use-cases/family/errors/family-not-found-error';
import { getFamily } from '../../use-cases/family/get-family';
import { getPreDeleteFamilyData } from '../../use-cases/family/get-pre-delete-family-animals';

export async function showDeleteFamilyForm(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = await getPreDeleteFamilyData(req.params.id);

  if (result instanceof FamilyNotFoundError) {
    next(new NotFound(result.message));
    return;
  }

  renderDeleteForm(res, {
    familyName: result.familyName,
    animals: result.animals.map(toTemplateAnimal),
  });
}

export async function handleDeleteFamily(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Extract ID
  const { id: familyId } = req.params;

  // Delete family
  const result = await deleteFamily({ id: familyId });

  if (result instanceof FamilyNotFoundError) {
    next(new NotFound(result.message));
    return;
  }

  if (result instanceof FamilyInUseError) {
    const family = await getFamily({ id: familyId });
    renderDeleteForm(res, {
      familyName: family.name,
      animals: result.animals.map(toTemplateAnimal),
    });
    return;
  }

  // All OK, family deleted
  res.redirect(fullRouteOf(familyRoutes.getAll()));
}

interface DeleteFamilyData {
  familyName: string;
  animals: TemplateAnimal[];
}

interface TemplateAnimal {
  name: string;
  detailsUrl: string;
}

function renderDeleteForm(res: Response, data: DeleteFamilyData) {
  res.render('animals/family/family-delete', {
    title: 'Animal Catalog | Delete Animal',
    ...data,
  });
}

function toTemplateAnimal(animal: PreDeleteFamilyAnimalDto) {
  return <TemplateAnimal>{
    name: animal.name,
    // TODO: Should use the animal routes
    detailsUrl: '',
  };
}
