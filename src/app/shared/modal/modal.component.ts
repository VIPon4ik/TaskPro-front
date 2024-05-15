import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ComponentRef, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ButtonComponent } from '@shared/ui/components/button/button.component';
import { ButtonColor } from '@shared/ui/models';
import { tap } from 'rxjs';
import { Modal } from './models';

@UntilDestroy()
@Component({
  selector: 'tp-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './modal.component.html',
})
export class ModalComponent<T extends Modal> implements AfterViewInit {
  @Input() component!: ComponentRef<T>;
  @Output() closeModal = new EventEmitter<void>();

  @ViewChild('componentContainer', { read: ViewContainerRef, static: true }) componentContainer!: ViewContainerRef;

  ButtonColor = ButtonColor;

  ngAfterViewInit(): void {
    this.componentContainer.insert(this.component.hostView);
    this.component.instance.closeModal
      .pipe(
        tap(() => this.closeModal.emit()),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
