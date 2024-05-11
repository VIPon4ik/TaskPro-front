import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonColor, ButtonType } from '@shared/ui/models';

@Component({
  selector: 'tp-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() color!: ButtonColor; 
  @Input() disabled!: boolean;
  @Input() type: ButtonType = ButtonType.Button;
  @Input() link!: string;
  @Output() btnClick = new EventEmitter<Event>();

  ButtonColor = ButtonColor;
}
