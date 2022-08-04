import { StorageKeys } from '../models/local-storage';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  currentTheme: BehaviorSubject<string> = new BehaviorSubject<string>('dark-theme');

  setTheme(themeName: string) {
    localStorage.setItem(StorageKeys.ThemeName, themeName);
    this.currentTheme.next(`${themeName}-theme`);
  }
}
