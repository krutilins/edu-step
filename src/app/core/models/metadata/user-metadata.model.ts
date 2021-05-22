export interface UserMetadata {
  id: string;
  email: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  displayName: string | null;
}
