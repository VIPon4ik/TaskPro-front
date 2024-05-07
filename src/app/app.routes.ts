import { Routes } from '@angular/router';
import { AuthPageComponent } from '@pages/auth/auth-page.component';
import { HomePageComponent } from '@pages/home/home-page.component';
import { WelcomePageComponent } from '@pages/welcome/welcome-page.component';

export const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'auth/login', component: AuthPageComponent },
  { path: 'auth/registration', component: AuthPageComponent },
  { path: 'home', component: HomePageComponent },
];
