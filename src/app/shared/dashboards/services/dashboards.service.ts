import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Dashboard } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DashboardsService {
  constructor(
    private http: HttpClient,
  ) {}

  getDashboards$(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(environment.baseURL + '/dashboards');
  }

  addDashboard$(dashboard: Dashboard): Observable<Dashboard> {
    return this.http.post<Dashboard>(environment.baseURL + '/dashboards', dashboard);
  }

  deleteDashboard$(dashboard: Dashboard): Observable<Dashboard> {
    return this.http.delete<Dashboard>(environment.baseURL + '/dashboards/' + dashboard.id);
  }
}
