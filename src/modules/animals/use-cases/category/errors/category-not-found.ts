export class CategoryNotFoundError extends Error {
  constructor(categoryId: string) {
    super(`The category with ID=${categoryId} does not exists`);
  }
}
