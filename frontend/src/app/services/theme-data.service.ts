import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeDataService {
  private readonly http = inject(HttpClient);

  getTheme(): Observable<string> {
    return of('light');
    //return this.http.get<string>('/api/theme');
  }

  saveTheme(theme: string): Observable<void> {
    return of();
    //return this.http.post<void>('/api/theme', theme);
  }
}
