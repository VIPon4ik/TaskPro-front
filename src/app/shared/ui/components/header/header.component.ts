import { Component, Input } from '@angular/core';
import { User } from '@shared/auth/models';

@Component({
  selector: 'tp-header',
  standalone: true,
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() user!: User;
}
