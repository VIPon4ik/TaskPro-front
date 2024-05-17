import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonColor } from '@shared/ui/models';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'tp-sidebar',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
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
        animate('1s ease'),
      ]),
      transition('endPosition => startPosition', [
        animate('1s ease'),
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
        animate('1s ease'),
      ]),
      transition('visible => notVisible', [
        animate('1s ease'),
      ]),
    ]),
  ],
})
export class SidebarComponent {
  @Input() showSidebar!: boolean;
  @Output() closeSidebar = new EventEmitter<void>();
  
  ButtonColor = ButtonColor;

  onClose(): void {
    this.showSidebar = !this.showSidebar;
    setTimeout(() => this.closeSidebar.emit(), 1000);
  }
}
