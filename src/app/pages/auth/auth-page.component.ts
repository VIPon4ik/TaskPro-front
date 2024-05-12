import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthResponse } from '@shared/auth/models';
import { UsersService } from '@shared/auth/services/users.service';
import { trimValidator } from '@shared/auth/validators/trim-validator';
import { switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputComponent } from '@shared/ui/components/input/input.component';
import { GetFormControlPipe } from '@shared/ui/pipes/get-form-control.pipe';
import { ButtonColor, ButtonType, InputType } from '@shared/ui/models';
import { ButtonComponent } from '@shared/ui/components/button/button.component';
import { ModalService } from '@shared/modal/services/modal.service';
import { passwordValidator } from './validators';
import { emailValidator } from './validators/email-validator';

@UntilDestroy()
@Component({
  selector: 'tp-registration-page',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    InputComponent,
    GetFormControlPipe,
    ButtonComponent,
  ],
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent implements OnInit {
  authForm!: FormGroup;
  isRegistrationPage = false;
  InputType = InputType;
  ButtonType = ButtonType;
  ButtonColor = ButtonColor;

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private usersService = inject(UsersService);
  private formBuilder = inject(FormBuilder);
  private modalService = inject(ModalService);

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
        email: ['', [emailValidator(0, 256)]],
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
          tap((data: AuthResponse) => this.usersService.setToken(data.token)),
          switchMap(() => this.usersService.getCurrentUser$()),
          tap(() => this.router.navigate(['/home'])),
          untilDestroyed(this),
        )
        .subscribe()
      : this.usersService
        .login$(this.authForm.value)
        .pipe(
          tap((data: AuthResponse) => this.usersService.setToken(data.token)),
          switchMap(() => this.usersService.getCurrentUser$()),
          tap(() => this.router.navigate(['/home'])),
          untilDestroyed(this),
        )
        .subscribe();
  }
}
