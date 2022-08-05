import { TestBed } from '@angular/core/testing';
import { SharedModule } from '../../../app/shared/shared.module';

import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
  let service: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule]
    });
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('info should open snackbar', () => {
    service['snackBar'].open = jest.fn();
    service.info('test');
    expect(service['snackBar'].open).toHaveBeenCalled();
  });

  it('error should open snackbar', () => {
    service['snackBar'].open = jest.fn();
    service.error('test');
    expect(service['snackBar'].open).toHaveBeenCalled();
  });
});
