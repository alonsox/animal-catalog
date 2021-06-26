export class ConservationStatusNotFoundError extends Error {
  constructor(statusId: string) {
    super(`The conservation status with ID=${statusId} does not exists`);
  }
}
