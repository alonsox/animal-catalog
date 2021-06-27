import { NextFunction, Request, Response } from 'express';
import { NotFound } from '../../../shared/errors';
import { PreDeleteClassAnimalDto } from '../../dto/class/pre-delete-class-dto';
import {
  animalRoutes,
  classRoutes,
  fullRouteOf,
} from '../../routes/routes.config';
import { deleteClass } from '../../use-cases/class/delete-class';
import { ClassInUseError } from '../../use-cases/class/errors/class-in-use';
import { ClassNotFoundError } from '../../use-cases/class/errors/class-not-found';
import { getClass } from '../../use-cases/class/get-class';
import { getPreDeleteClassData } from '../../use-cases/class/get-pre-delete-class-animals';

export async function showDeleteClassForm(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = await getPreDeleteClassData(req.params.id);

  if (result instanceof ClassNotFoundError) {
    next(new NotFound(result.message));
    return;
  }

  renderDeleteForm(res, {
    className: result.className,
    animals: result.animals.map(toTemplateAnimal),
  });
}

// Processes the class delete form on POST
export async function handleDeleteClass(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Extract ID
  const { id: classId } = req.params;

  // Delete class
  const result = await deleteClass({ id: classId });

  if (result instanceof ClassNotFoundError) {
    next(new NotFound(result.message));
    return;
  }

  if (result instanceof ClassInUseError) {
    const theClass = await getClass({ id: classId });
    renderDeleteForm(res, {
      className: theClass.name,
      animals: result.animals.map(toTemplateAnimal),
    });
    return;
  }

  // All OK, class deleted
  res.redirect(fullRouteOf(classRoutes.getAll()));
}

interface DeleteClassData {
  className: string;
  animals: TemplateAnimal[];
}

interface TemplateAnimal {
  name: string;
  detailsUrl: string;
}

function renderDeleteForm(res: Response, data: DeleteClassData) {
  res.render('animals/class/class-delete', {
    title: 'Animal Catalog | Delete Animal',
    ...data,
  });
}

function toTemplateAnimal(animal: PreDeleteClassAnimalDto) {
  return <TemplateAnimal>{
    name: animal.name,
    detailsUrl: fullRouteOf(animalRoutes.getDetails(animal.id)),
  };
}
