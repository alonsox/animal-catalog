export interface UpdateAnimalDto {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  photoSrc?: string;
  class: string;
  family: string;
  status: string;
}
