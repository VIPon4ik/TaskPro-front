import { Component, Input } from '@angular/core';

@Component({
  selector: 'tp-modal',
  standalone: true,
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() content!: string;
}
