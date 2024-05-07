import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator = (min: number, max: number): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasDigit = /\d/.test(value);

  if (value.length === 0) {
    return { required: true };
  }

  if (value.length < min) {
    return { minLength: true };
  }

  if (value.length > max) {
    return { maxLength: true };
  }

  if (!hasUpperCase) {
    return { upperCase: true };
  }

  if (!hasLowerCase) {
    return { lowerCase: true };
  }

  if (!hasDigit) {
    return { digit: true };
  }

  return null;
};
