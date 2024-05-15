import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@shared/auth/models';

@Component({
  selector: 'tp-header',
  standalone: true,
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() user!: User;
  @Output() openSidebar = new EventEmitter<void>();
}
