export interface CreateAnimalDto {
  name: string;
  scientificName: string;
  description: string;
  photoSrc?: string;
  class: string;
  family: string;
  status: string;
}
