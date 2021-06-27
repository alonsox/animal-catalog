import { Request, Response } from 'express';
import { getAllClasses } from '../../use-cases/class/get-all-classes';
import { getAllConservationStatuses } from '../../use-cases/conservation-status/get-all-conservation-statuses';
import { getAllFamilies } from '../../use-cases/family/get-all-families';
import { renderAnimalForm } from './shared';

const formTitle = 'Create Animal';

export async function showCreateAnimalForm(req: Request, res: Response) {
  const classes = await getAllClasses();
  const families = await getAllFamilies();
  const statuses = await getAllConservationStatuses();

  renderAnimalForm(res, {
    formTitle,
    classes,
    families,
    statuses,
  });
}
