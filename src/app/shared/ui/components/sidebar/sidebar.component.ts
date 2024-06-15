import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ButtonColor } from '@shared/ui/models';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsersService } from '@shared/auth/services/users.service';
import { Dashboard } from '@shared/dashboards/models';
import { ButtonComponent } from '../button/button.component';
import { StopPropaganationDirective } from '@shared/directives';

@Component({
  selector: 'tp-sidebar',
  standalone: true,
  imports: [ButtonComponent, CommonModule, StopPropaganationDirective],
  templateUrl: './sidebar.component.html',
  animations: [
    trigger('slide', [
      state('startPosition', style({        
        transform: 'translateX(-100%)',
      })),
      state('endPosition', style({
        transform: 'translateX(0)',
      })),
      transition('startPosition => endPosition', [
        animate('0.5s ease'),
      ]),
      transition('endPosition => startPosition', [
        animate('0.5s ease'),
      ]),
    ]),
    trigger('appear', [
      state('notVisible', style({
        display: 'none',
        opacity: 0,
      })),
      state('visible', style({
        display: 'block',
        opacity: 0.5,
      })),
      transition('notVisible => visible', [
        animate('0.5s ease'),
      ]),
      transition('visible => notVisible', [
        animate('0.5s ease'),
      ]),
    ]),
  ],
})
export class SidebarComponent {  
  @Input() showSidebar!: boolean;
  @Input() dashboards!: Dashboard[];
  @Input() currentDashboard!: Dashboard | null;
  @Output() closeSidebar = new EventEmitter<void>();
  @Output() openDashboardModal = new EventEmitter<void>();
  @Output() changeCurrentDashboard = new EventEmitter<Dashboard>();
  @Output() deleteDashboard = new EventEmitter<number>()
  
  ButtonColor = ButtonColor;

  private router = inject(Router);
  private usersService = inject(UsersService);

  onLogOut(): void {
    this.usersService.logOut();
    this.router.navigate(['login']);
  }
}
