import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { AuthResponse, LoginPayload, RegisterPayload } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login$(body: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.baseURL + '/users/login', body);
  }

  register$(body: RegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.baseURL + '/users/register', body);
  }
}
