/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UsersService } from '@shared/auth/services/users.service';
import { HeaderComponent } from '@shared/ui/components/header/header.component';
import { SidebarComponent } from '@shared/ui/components/sidebar/sidebar.component';

@Component({
  selector: 'tp-home-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  private usersService = inject(UsersService);
  
  currentUser = this.usersService.user$;
  showSidebar = false;
}
