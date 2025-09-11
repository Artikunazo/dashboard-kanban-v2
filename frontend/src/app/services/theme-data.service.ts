import { httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeDataService {

  getTheme(): HttpResourceRef<unknown> {
    return httpResource(() => '/api/theme');
  }

  saveTheme(theme: string): HttpResourceRef<unknown> {
    return httpResource(() => ({
      url: '/api/theme',
      method: 'POST',
      body: theme
    }));
  }
}
