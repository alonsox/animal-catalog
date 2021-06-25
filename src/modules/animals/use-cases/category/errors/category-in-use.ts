// TODO: Include the animals in use?

export class CategoryInUseError extends Error {
  constructor(categoryName: string) {
    super(`The category "${categoryName}" is used by some animals`);
  }
}
