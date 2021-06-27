import { Response } from 'express';
import { BasicClassDto } from '../../dto/class/basic-class-dto';
import { BasicConservationStatusDto } from '../../dto/conservation-status/basic-conservation-status.dto';
import { BasicFamilyDto } from '../../dto/family/basic-family-dto';

interface AnimalData {
  name: string;
  scientificname: string;
  description: string;
  photoSrc: string;
  familyId: string;
  classId: string;
  statusId: string;
}

interface AnimalFormData {
  formTitle: string; // Create or update
  animal: AnimalData;
  classes: BasicClassDto[];
  families: BasicFamilyDto[];
  statuses: BasicConservationStatusDto[];
}

export function renderAnimalForm(res: Response, data: AnimalFormData) {
  res.render('animals/animal/animal-form', {
    formTitle: data.formTitle || 'Animal Form',
  });
}
