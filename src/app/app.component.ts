/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UsersService } from '@shared/auth/services/users.service';
import { catchError, of } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private usersService = inject(UsersService);
  private router = inject(Router);

  currentUser = this.usersService.user$;

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.usersService.getCurrentUser$()
        .pipe(
          catchError(() => {
            localStorage.removeItem('token');
            this.router.navigate(['welcome']);
            return of();
          }),
          untilDestroyed(this),
        )
        .subscribe();
    }
  }
}
