import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
  name: 'getFormControl',
  standalone: true,
})
export class GetFormControlPipe implements PipeTransform {
  transform(control: AbstractControl): FormControl {
    return control as FormControl;
  }
}
