import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserMetadata } from '../models/metadata/user-metadata.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userLocalStorageKey = 'user'; // TODO: replace in environment

  constructor(
    public angularFirestore: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.angularFireAuth.authState.subscribe(firebaseUser => {
      localStorage.setItem(this.userLocalStorageKey, JSON.stringify(firebaseUser));
    });
  }

  get userMetadata$(): Observable<UserMetadata | null> {
    return this.angularFireAuth.authState.pipe(
      map(firebaseUser => firebaseUser ? this.userMetadataFromFirebaseUser(firebaseUser) : null)
    );
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem(this.userLocalStorageKey);
    return user ? Boolean(JSON.parse(user)?.emailVerified) : false;
  }

  public signIn(email: string, password: string): Promise<void> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password).then(result => {
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      });
      if (result.user) {
        this.setUserData(result.user);
      } // TODO: add throw error in else block
    }).catch((error) => {
      window.alert(error.message); // TODO: delete alert method
    });
  }

  public signUp(email: string, password: string): Promise<void> {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(result => {
      this.sendVerificationMail();
      if (result.user) {
        this.setUserData(result.user);
      } // TODO: add throw error in else block
    }).catch((error) => {
      window.alert(error.message); // TODO: delete alert method
    });
  }

  public signOut(): Promise<void> {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem(this.userLocalStorageKey);
      this.router.navigate(['sign-in']); // TODO: should I implement redirect in the service?
    });
  }

  public forgotPassword(passwordResetEmail: string): Promise<void> {
    return this.angularFireAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  public googleAuth(): Promise<void> {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  public sendVerificationMail(): Promise<void> | undefined {
    return firebase.auth().currentUser?.sendEmailVerification().then(() => {
      this.router.navigate(['verify-email-address']); // TODO: change this part of code
    });
  }

  private authLogin(provider: firebase.auth.AuthProvider): Promise<void> {
    return this.angularFireAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']); // TODO: should I implement redirect in the service?
        });
        if (result.user) {
          this.setUserData(result.user);
        } // TODO: add throw error in else block
      }).catch((error) => {
        window.alert(error); // TODO: delete alert
      });
  }

  private setUserData(firebaseUser: firebase.User): Promise<void> {
    return this.angularFirestore.collection<UserMetadata>('users').doc(firebaseUser.uid).get().forEach(userDocSnapshot => {
      const userMetadata = this.userMetadataFromFirebaseUser(firebaseUser);

      if (userDocSnapshot.exists) {
        userDocSnapshot.ref.update(userMetadata);
      } else {
        userDocSnapshot.ref.set({
          ...userMetadata
        });
      }
    });
  }

  private userMetadataFromFirebaseUser(firebaseUser: firebase.User): UserMetadata {
    return {
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      id: firebaseUser.uid,
      photoURL: firebaseUser.photoURL,
      emailVerified: firebaseUser.emailVerified
    };
  }
}
