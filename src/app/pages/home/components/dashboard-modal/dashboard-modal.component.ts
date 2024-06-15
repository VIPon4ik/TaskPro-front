import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { trimValidator } from '@shared/auth/validators/trim-validator';
import { Dashboard, DashboardBackgrounds, DashboardIcons } from '@shared/dashboards/models';
import { ButtonComponent } from '@shared/ui/components/button/button.component';
import { InputComponent } from '@shared/ui/components/input/input.component';
import { ButtonColor, ButtonType } from '@shared/ui/models';
import { GetFormControlPipe } from '@shared/ui/pipes/get-form-control.pipe';
import { tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'tp-dashboard-modal',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    GetFormControlPipe,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-modal.component.html',
})
export class DashboardModalComponent implements OnInit {
  @Input() dashboard!: Dashboard;
  @Output() closeModal = new EventEmitter<void>();
  @Output() createDashboard = new EventEmitter<Dashboard>();
  @Output() editDashboard = new EventEmitter<Dashboard>();

  dashboardForm!: FormGroup;
  ButtonColor = ButtonColor;
  ButtonType = ButtonType;
  DashboardIcons = DashboardIcons;

  private formBuilder = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  get icons(): string[] {
    return Object.values(DashboardIcons);
  }

  get backgrounds(): string[] {
    return Object.values(DashboardBackgrounds);
  }

  ngOnInit(): void {
    this.setupForm();
    this.handleValueChanges();
    this.cdr.detectChanges();
  }

  setupForm(): void {
    this.dashboardForm = this.formBuilder.group({
      name: [this.dashboard?.name ?? '', [trimValidator(2, 72)]],
      icon: [this.dashboard?.icon ?? DashboardIcons.Project],
      background: [this.dashboard?.background ?? DashboardBackgrounds.NoBg],
    });
  }

  handleValueChanges(): void {
    this.dashboardForm.valueChanges
      .pipe(
        tap(() => this.cdr.detectChanges()),
        untilDestroyed(this),
      )
      .subscribe();
  }

  onSave(): void {
    this.dashboard ? this.editDashboard.emit(this.dashboardForm.value) : this.createDashboard.emit(this.dashboardForm.value);
  }
}
