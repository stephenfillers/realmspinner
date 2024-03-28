import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.user$.subscribe((user) => {
    if (user) {
      return true;
    } else {
      router.navigateByUrl('/');
      return false;
    }
  });
};
