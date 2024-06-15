/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { UsersService } from '@shared/auth/services/users.service';
import { ModalService } from '@shared/modal/services/modal.service';
import { HeaderComponent } from '@shared/ui/components/header/header.component';
import { SidebarComponent } from '@shared/ui/components/sidebar/sidebar.component';
import { Dashboard } from '@shared/dashboards/models';
import { DashboardsService } from '@shared/dashboards/services/dashboards.service';
import { ConfirmationModalComponent } from '@shared/modal/components/confirmation-modal/confirmation-modal.component';
import { switchMap, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ButtonComponent } from '@shared/ui/components/button/button.component';
import { DashboardModalComponent } from './components';

@UntilDestroy()
@Component({
  selector: 'tp-home-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, ButtonComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  private usersService = inject(UsersService);
  private modalService = inject(ModalService);
  private dashboardService = inject(DashboardsService);

  currentUser = this.usersService.user$;
  showSidebar = false;
  dashboards!: Dashboard[];
  currentDashboard: Dashboard | null = null;

  ngOnInit(): void {
    this.showSidebar = window.innerWidth >= 1440;
    this.dashboardService.getDashboards$()
      .pipe(
        tap((dashboards: Dashboard[]) => {
          this.dashboards = dashboards;
          this.currentDashboard = dashboards[0];
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  openDashboardModal(dashboard?: Dashboard): void {
    const modalRef = this.modalService.open(DashboardModalComponent);

    if (dashboard) {
      modalRef.instance.dashboard = dashboard;
      modalRef.instance.ngOnInit();
    }

    modalRef.instance.createDashboard
      .pipe(
        switchMap((dashboardToAdd: Dashboard) => this.dashboardService.addDashboard$(dashboardToAdd)),
        tap((addedDashboard: Dashboard) => {
          this.dashboards.push(addedDashboard);
          this.currentDashboard = addedDashboard;
          modalRef.instance.closeModal.emit();
        }),
        untilDestroyed(this),
      )
      .subscribe();

    modalRef.instance.editDashboard
      .pipe(
        switchMap((dashboardToEdit: Dashboard) => this.dashboardService.updateDashboard$({ ...dashboard, ...dashboardToEdit })),
        tap((editedDashboard) => {
          const dashboardIndex = this.dashboards.findIndex(item => item.id === editedDashboard.id);
          this.dashboards[dashboardIndex] = editedDashboard;
          modalRef.instance.closeModal.emit();
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  onChangeCurrentDashboard(dashboard: Dashboard): void {
    this.currentDashboard = dashboard;
  }

  onDeleteDashboard(dashboard: Dashboard): void {
    const modalRef = this.modalService.open(ConfirmationModalComponent, {
      header: 'Delete dashboard',
      content: `Are you sure you want to delete <span class="text-danger text-sm">&#x00AB ${dashboard.name} &#x00BB</span> dashboard?`,
    });

    modalRef.instance.acceptModal
      .pipe(
        switchMap(() => this.dashboardService.deleteDashboard$(dashboard)),
        tap(() => {
          this.dashboards = this.dashboards.filter(item => item.id !== dashboard.id);
          this.currentDashboard = this.currentDashboard?.id === dashboard.id ? (this.dashboards.length ? this.dashboards[0] : null) : this.currentDashboard;
          modalRef.instance.closeModal.emit();
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  openColumnModal(): void {
    // const modalRef = this.modalService.open();
  }
}
