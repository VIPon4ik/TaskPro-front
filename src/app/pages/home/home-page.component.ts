/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from '@shared/auth/services/users.service';
import { ModalService } from '@shared/modal/services/modal.service';
import { HeaderComponent } from '@shared/ui/components/header/header.component';
import { SidebarComponent } from '@shared/ui/components/sidebar/sidebar.component';
import { CreateBoardModalComponent } from './components';

@Component({
  selector: 'tp-home-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  private usersService = inject(UsersService);
  private modalService = inject(ModalService);
  
  currentUser = this.usersService.user$;
  showSidebar = false;

  ngOnInit(): void {
    this.showSidebar = window.innerWidth >= 1440;
  }

  openDashboardModal(): void {
    this.modalService.open(CreateBoardModalComponent);
  }
}
