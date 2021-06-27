import { Response } from 'express';
import {
  capitalizeAll,
  toLower,
  toUpper,
} from '../../../shared/utils/formatters';
import { AnimalDto } from '../../dto/animal/animal.dto';
import { BasicClassDto } from '../../dto/class/basic-class-dto';
import { BasicConservationStatusDto } from '../../dto/conservation-status/basic-conservation-status.dto';
import { BasicFamilyDto } from '../../dto/family/basic-family-dto';
import { getAllClasses } from '../../use-cases/class/get-all-classes';
import { getAllConservationStatuses } from '../../use-cases/conservation-status/get-all-conservation-statuses';
import { getAllFamilies } from '../../use-cases/family/get-all-families';
import { AnimalvalidationErrors } from '../../validators/animal.validators';

interface AnimalData {
  name: string;
  scientificName: string;
  description: string;
  photoSrc?: string;
  familyId: string;
  classId: string;
  statusId: string;
}

interface AnimalFormData {
  formTitle: string; // Create or update
  animal?: AnimalData;
  classes: TemplateClass[];
  families: TemplateFamily[];
  statuses: TemplateConservationStatus[];
  errors?: AnimalvalidationErrors;
}

export function toAnimalData(animal: AnimalDto): AnimalData {
  return {
    name: animal.name,
    scientificName: toLower(animal.scientificName),
    description: animal.description,
    photoSrc: animal.photoSrc,
    familyId: animal.family,
    classId: animal.class,
    statusId: animal.status,
  };
}

export function renderAnimalForm(res: Response, data: AnimalFormData) {
  res.render('animals/animal/animal-form', {
    title: 'Animal Catalog',
    formTitle: data.formTitle || 'Animal Form',
    animal: data.animal || emptyAnimalData(),
    classes: data.classes || [],
    families: data.families || [],
    statuses: data.statuses || [],
    errors: data.errors || {},
  });
}

function emptyAnimalData(): AnimalData {
  return {
    name: '',
    scientificName: '',
    description: '',
    photoSrc: '',
    familyId: '',
    classId: '',
    statusId: '',
  };
}

interface AnimalFormSelectsInfo {
  classes: TemplateClass[];
  statuses: TemplateConservationStatus[];
  families: TemplateFamily[];
}

/** Gets the information to put in the selects of the animal form */
export async function getAnimalFormsSelectInfo(): Promise<AnimalFormSelectsInfo> {
  const classes = await getAllClasses();
  const families = await getAllFamilies();
  const statuses = await getAllConservationStatuses();

  return {
    classes: classes.map(toTemplateClass),
    families: families.map(toTemplateFamily),
    statuses: statuses.map(toTemplateStatus),
  };
}

interface TemplateClass {
  id: string;
  name: string;
}

interface TemplateFamily {
  id: string;
  name: string;
}

interface TemplateConservationStatus {
  id: string;
  name: string;
  abbreviation: string;
}

export function toTemplateClass(theClass: BasicClassDto): TemplateClass {
  return {
    id: theClass.id,
    name: capitalizeAll(theClass.name),
  };
}

export function toTemplateFamily(family: BasicFamilyDto): TemplateFamily {
  return {
    id: family.id,
    name: capitalizeAll(family.name),
  };
}

export function toTemplateStatus(
  status: BasicConservationStatusDto,
): TemplateConservationStatus {
  return {
    id: status.id,
    abbreviation: toUpper(status.abbreviation),
    name: capitalizeAll(status.name),
  };
}
