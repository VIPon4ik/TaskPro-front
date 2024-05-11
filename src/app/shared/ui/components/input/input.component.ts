import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ERROR_MESSAGES } from '@shared/auth/constants/error-messages';
import { ErrorMessages } from '@shared/auth/models';
import { InputType } from '@shared/ui/models';

@Component({
  selector: 'tp-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() control!: FormControl;
  @Input() type!: InputType;
  @Input() placeholder!: string;
  
  hidePassword = true;
  InputType = InputType;
  errorMessages: ErrorMessages = ERROR_MESSAGES;
}
