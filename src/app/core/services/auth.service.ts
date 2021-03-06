import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserMetadata } from '../models/metadata/user-metadata.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserState } from '../store/models/user-state.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public firebaseUser$ = new BehaviorSubject<firebase.User | null>(null);
  private userLocalStorageKey = 'user';

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(firebaseUser => {
      localStorage.setItem(this.userLocalStorageKey, JSON.stringify(firebaseUser));
    });
  }

  get userState$(): Observable<UserState | null> {
    return this.afAuth.authState.pipe(
      map(firebaseUser => {
        if (firebaseUser) {
          return {
            userMetadata: {
              displayName: firebaseUser.displayName,
              email: firebaseUser.email,
              id: firebaseUser.uid,
              photoURL: firebaseUser.photoURL,
              emailVerified: firebaseUser.emailVerified
            }
          };
        } else {
          return null;
        }
      })
    );
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem(this.userLocalStorageKey);
    if (user) {
      return Boolean(JSON.parse(user)?.emailVerified);
    }
    return false;
  }

  public signIn(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
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
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        if (result.user) {
          this.setUserData(result.user);
        } // TODO: add throw error in else block
      }).catch((error) => {
        window.alert(error.message); // TODO: delete alert method
      });
  }

  public signOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem(this.userLocalStorageKey); // TODO: make constant
      this.router.navigate(['sign-in']); // TODO: should I implement redirect in the service?
    });
  }

  public forgotPassword(passwordResetEmail: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  public googleAuth(): Promise<void> {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  private authLogin(provider: firebase.auth.AuthProvider): Promise<void> {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => { /// TODO: what is it for?
          this.router.navigate(['dashboard']); // TODO: should I implement redirect in the service?
        });
        if (result.user) {
          this.setUserData(result.user);
        } // TODO: add throw error in else block
      }).catch((error) => {
        window.alert(error); // TODO: delete alert
      });
  }

  public sendVerificationMail(): Promise<void> | undefined {
    return firebase.auth().currentUser?.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']); // TODO: change this part of code
      });
  }

  private setUserData(firebaseUser: firebase.User): Promise<void> {
    return this.afs.collection<UserMetadata>('users').doc(firebaseUser.uid).get().forEach(userDocSnapshot => {
      const userMetadata = {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        emailVerified: firebaseUser.emailVerified
      };

      if (userDocSnapshot.exists) {
        userDocSnapshot.ref.update(userMetadata);
      } else {
        userDocSnapshot.ref.set({
          ...userMetadata
        });
      }
    });
  }
}
