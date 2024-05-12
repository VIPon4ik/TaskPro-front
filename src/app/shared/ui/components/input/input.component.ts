import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
}
