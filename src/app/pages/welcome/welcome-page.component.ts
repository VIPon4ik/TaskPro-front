import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@shared/ui/components/button/button.component';
import { ButtonColor } from '@shared/ui/models';

@Component({
  standalone: true,
  imports: [RouterModule, ButtonComponent],
  selector: 'tp-welcome-page',
  templateUrl: './welcome-page.component.html',
})
export class WelcomePageComponent {
  ButtonColor = ButtonColor;
}
