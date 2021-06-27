import { Response } from 'express';
import { AnimalDto } from '../../dto/animal/animal.dto';
import { BasicClassDto } from '../../dto/class/basic-class-dto';
import { BasicConservationStatusDto } from '../../dto/conservation-status/basic-conservation-status.dto';
import { BasicFamilyDto } from '../../dto/family/basic-family-dto';
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
  classes: BasicClassDto[];
  families: BasicFamilyDto[];
  statuses: BasicConservationStatusDto[];
  errors?: AnimalvalidationErrors;
}

export function toAnimalData(animal: AnimalDto): AnimalData {
  return {
    name: animal.name,
    scientificName: animal.scientificName,
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
