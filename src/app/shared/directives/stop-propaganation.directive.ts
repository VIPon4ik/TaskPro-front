import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[tp-stop-propaganation]',
  standalone: true,
})
export class StopPropaganationDirective {
  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.stopPropagation();
  }
}
