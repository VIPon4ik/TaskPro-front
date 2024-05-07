import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const trimValidator = (min: number, max: number): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
  const trimmedValue = control.value.trim();
 
  if (trimmedValue.length === 0) {
    return { required: true };
  }

  if (trimmedValue.length < min) {
    return { minLength: true };
  }

  if (trimmedValue.length > max) {
    return { maxLength: true };
  }

  return null;
};
