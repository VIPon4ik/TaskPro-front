import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalOptions } from '@shared/modal/models';
import { ButtonComponent } from '@shared/ui/components/button/button.component';
import { ButtonColor } from '@shared/ui/models';

@Component({
  selector: 'tp-confirmation-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './confirmation-modal.component.html',
})
export class ConfirmationModalComponent {
  @Input() options!: ModalOptions;
  @Output() acceptModal = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  ButtonColor = ButtonColor;
}
