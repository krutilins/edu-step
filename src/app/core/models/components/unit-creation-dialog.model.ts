import { UnitMetadata } from '../metadata/unit-metadata.model';

export interface UnitCreationDialogData extends UnitMetadata {
  dialogType: string;
}
