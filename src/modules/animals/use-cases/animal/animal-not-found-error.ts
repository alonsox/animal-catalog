export class AnimalNotFoundError extends Error {
  constructor(animalId: string) {
    super(`Animal with ID="${animalId}" does not exist`);
  }
}
