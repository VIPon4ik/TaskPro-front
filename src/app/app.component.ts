/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UsersService } from '@shared/auth/services/users.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private usersService = inject(UsersService);

  currentUser = this.usersService.user$;

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.usersService.getCurrentUser$()
        .pipe(
          untilDestroyed(this),
        )
        .subscribe();
    }
  }
}
