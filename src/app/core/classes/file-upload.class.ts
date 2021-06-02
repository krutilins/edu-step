// TODO: Should I implement the Dependency Inversion Principle?
// Or should I not use a class here, and an interface implementation would enough?
export class FileUpload {
  key: string; // TODO: not clear property
  name: string; // TODO: not clear property
  url: string; // TODO: not clear property
  file: File; // TODO: not clear property

  constructor(file: File) {
    this.file = file;
  }
}
