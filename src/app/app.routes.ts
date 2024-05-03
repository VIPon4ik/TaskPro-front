import { Routes } from '@angular/router';
import { AuthPageComponent } from '@pages/auth/auth-page.component';
import { WelcomePageComponent } from '@pages/welcome/welcome-page.component';

export const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'auth', component: AuthPageComponent },
];
