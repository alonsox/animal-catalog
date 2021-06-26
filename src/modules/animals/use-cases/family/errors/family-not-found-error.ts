export class FamilyNotFoundError extends Error {
  constructor(familyId: string) {
    super(`The family with ID=${familyId} does not exists`);
  }
}
