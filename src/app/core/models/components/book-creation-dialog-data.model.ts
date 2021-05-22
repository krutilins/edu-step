import { BookMetadata } from '../metadata/book-metadata.model';

export interface BookCreationDialogData extends BookMetadata {
  type: string;
}
