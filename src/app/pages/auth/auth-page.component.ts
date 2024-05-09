import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthResponse } from '@shared/auth/models';
import { UsersService } from '@shared/auth/services/users.service';
import { trimValidator } from '@shared/auth/validators/trim-validator';
import { finalize, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ERROR_MESSAGES } from '@shared/auth/constants/error-messages';
import { passwordValidator } from './validators';

@UntilDestroy()
@Component({
  selector: 'tp-registration-page',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent implements OnInit {
  authForm!: FormGroup;
  isRegistrationPage = false;
  isLoading!: boolean;
  hidePassword = true;
  errorMessages: { [key: string]: string } = ERROR_MESSAGES;

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private usersService = inject(UsersService);
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.activatedRoute.url
      .pipe(
        tap((params) => {
          this.isRegistrationPage = params[1].path === 'registration';
          this.setupForm();
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  setupForm(): void {
    this.authForm = this.isRegistrationPage
      ? this.formBuilder.group({
        name: ['', trimValidator(2, 36)],
        email: ['', [Validators.email, trimValidator(0, 256)]],
        password: ['', [passwordValidator(8, 36)]],
      })
      : this.formBuilder.group({
        email: [''],
        password: [''],
      });
  }

  onSubmit(): void {
    this.isRegistrationPage
      ? this.usersService
        .register$(this.authForm.value)
        .pipe(
          tap((data: AuthResponse) => {
            this.usersService.setToken(data.token);
          }),
          switchMap(() => this.usersService.getCurrentUser$()),
          finalize(() => this.router.navigate(['/home'])),
          untilDestroyed(this),
        )
        .subscribe()
      : this.usersService
        .login$(this.authForm.value)
        .pipe(
          tap((data: AuthResponse) => {
            this.usersService.setToken(data.token);
          }),
          switchMap(() => this.usersService.getCurrentUser$()),
          finalize(() => this.router.navigate(['/home'])),
          untilDestroyed(this),
        )
        .subscribe();
  }
}
