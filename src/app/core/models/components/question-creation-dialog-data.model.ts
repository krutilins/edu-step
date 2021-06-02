import { QuestionMetadata } from '../metadata/question-metadata.model';

export interface QuestionCreationDialogData extends QuestionMetadata {
  dialogType: string;
}
