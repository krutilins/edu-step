import { UserMetadata } from '../../models/metadata/user-metadata.model';

export interface UserState {
  userMetadata: UserMetadata | null;
}
