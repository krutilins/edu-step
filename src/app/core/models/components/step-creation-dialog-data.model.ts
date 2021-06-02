import { StepMetadata } from '../metadata/step-metadata.model';

export interface StepCreationDialogData extends StepMetadata {
  dialogType: string;
}
