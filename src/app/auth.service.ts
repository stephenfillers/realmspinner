import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
  idToken,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

interface User {
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  idToken$ = idToken(this.firebaseAuth);
  currentUserSignal = signal<User | null | undefined>(undefined);

  signUp(email: string, password: string): Observable<UserCredential> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    );

    return from(promise);
  }

  signIn(email: string, password: string): Observable<UserCredential> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    );

    return from(promise);
  }

  signOut(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }
}
