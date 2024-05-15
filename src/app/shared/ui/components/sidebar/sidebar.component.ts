import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonColor } from '@shared/ui/models';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'tp-sidebar',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Output() closeSidebar = new EventEmitter<void>();
  ButtonColor = ButtonColor;
}
