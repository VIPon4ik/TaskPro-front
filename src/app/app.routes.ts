import { Routes } from '@angular/router';
import { AuthPageComponent } from '@pages/auth/auth-page.component';
import { HomePageComponent } from '@pages/home/home-page.component';
import { WelcomePageComponent } from '@pages/welcome/welcome-page.component';
import { privateGuard } from '@shared/auth/guards/private.guard';
import { publicGuard } from '@shared/auth/guards/public.guard';

export const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent, canActivate: [publicGuard] },
  { path: 'auth/login', component: AuthPageComponent, canActivate: [publicGuard] },
  { path: 'auth/registration', component: AuthPageComponent, canActivate: [publicGuard] },
  { path: 'home', component: HomePageComponent, canActivate: [privateGuard] },
  { path: '**', redirectTo: 'welcome' },
];
