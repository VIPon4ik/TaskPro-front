import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalOptions } from '@shared/modal/models';
import { ButtonComponent } from '@shared/ui/components/button/button.component';
import { ButtonColor } from '@shared/ui/models';

@Component({
  selector: 'tp-error-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './error-modal.component.html',
})
export class ErrorModalComponent {
  @Input() options!: ModalOptions;
  @Output() closeModal = new EventEmitter<void>();

  ButtonColor = ButtonColor;
}
