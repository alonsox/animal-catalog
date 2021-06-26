export class ClassNotFoundError extends Error {
  constructor(classId: string) {
    super(`The class with ID=${classId} does not exists`);
  }
}
