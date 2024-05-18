import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DashboardBackgrounds, DashboardIcons } from '@pages/home/models';
import { ButtonComponent } from '@shared/ui/components/button/button.component';
import { InputComponent } from '@shared/ui/components/input/input.component';
import { ButtonColor } from '@shared/ui/models';
import { GetFormControlPipe } from '@shared/ui/pipes/get-form-control.pipe';

@Component({
  selector: 'tp-create-board-modal',
  standalone: true,
  imports: [InputComponent, ButtonComponent, GetFormControlPipe],
  templateUrl: './create-board-modal.component.html',
})
export class CreateBoardModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  dashboardForm!: FormGroup;
  ButtonColor = ButtonColor;

  private formBuilder = inject(FormBuilder);

  get icons(): string[] {
    return Object.values(DashboardIcons);
  }

  get backgrounds(): string[] {
    return Object.values(DashboardBackgrounds);
  }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.dashboardForm = this.formBuilder.group({
      title: [''],
      icon: [''],
      background: [''],
    });
  }

}
