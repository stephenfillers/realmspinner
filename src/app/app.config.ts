import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const firebaseConfig = {
  apiKey: 'AIzaSyDHpIjPZF3dAhvaOnY9zLFADZWf0gY9pC0',
  authDomain: 'realmspinner-b4902.firebaseapp.com',
  projectId: 'realmspinner-b4902',
  storageBucket: 'realmspinner-b4902.appspot.com',
  messagingSenderId: '815341856615',
  appId: '1:815341856615:web:6a7487a7e433f83d7971c2',
  measurementId: 'G-BPH95LW5QY',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFunctions(() => getFunctions()),
    ]),
  ],
};
