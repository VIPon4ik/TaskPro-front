import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DashboardBackgrounds, DashboardIcons } from '@pages/home/models';
import { ButtonComponent } from '@shared/ui/components/button/button.component';
import { InputComponent } from '@shared/ui/components/input/input.component';
import { ButtonColor } from '@shared/ui/models';
import { GetFormControlPipe } from '@shared/ui/pipes/get-form-control.pipe';
import { tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'tp-create-board-modal',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    GetFormControlPipe,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-board-modal.component.html',
})
export class CreateBoardModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  dashboardForm!: FormGroup;
  ButtonColor = ButtonColor;
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
  }

  setupForm(): void {
    this.dashboardForm = this.formBuilder.group({
      title: [''],
      icon: [DashboardIcons.Project],
      background: [DashboardBackgrounds.NoBg],
    });
  }

  handleValueChanges(): void {
    this.dashboardForm.valueChanges
      .pipe(
        tap(() => {
          console.log(this.dashboardForm.value);this.cdr.detectChanges();
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
