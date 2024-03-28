import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  signInForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage: string | null = null;

  signIn() {
    const { email, password } = this.signInForm.getRawValue();

    this.authService.signIn(email, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.log('The error', err);
        this.errorMessage = err.code;
      },
    });
  }
}
