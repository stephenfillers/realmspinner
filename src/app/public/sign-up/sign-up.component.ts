import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  signUpForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage: string | null = null;

  signUp() {
    const { email, password } = this.signUpForm.getRawValue();

    this.authService.signUp(email, password).subscribe({
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
