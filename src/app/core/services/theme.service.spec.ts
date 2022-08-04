import { StorageKeys } from '../models/local-storage';
import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('current theme should be initialized', () => {
    expect(service.currentTheme$).toBeTruthy();
  });

  it('setTheme should add value to theme obs and update local storage', () => {
    Object.defineProperty(window, 'localStorage', { value: { setItem: jest.fn() } });
    service.currentTheme$ = { nest: jest.fn() } as any;
    service.setTheme('dark');
    expect(localStorage.setItem).toHaveBeenCalledWith(StorageKeys.ThemeName, 'dark');
    expect(service.currentTheme$).toHaveBeenCalledWith('dark-theme');
  });
});
