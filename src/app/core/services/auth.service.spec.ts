import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { LoginResponseDTO } from '../models/authentication';
import { CustomResponse } from '../models/response';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login should call login api', () => {
    const testData: CustomResponse<LoginResponseDTO> = {
      code: 200,
      ok: true,
      result: {
        token: 'test',
        user: {
          id: 0,
          first_name: 'first',
          last_name: 'last',
          profile_completed: false,
          role_id: 2,
          status: 2,
          username: 'username'
        }
      }
    };

    service.login('', '').subscribe(res => {
      expect(res).toBe(testData);
    })

    const request = httpController.expectOne({
      method: 'POST',
      url: `${environment.authServiceURL}/auth/login`,
    });

    request.flush(testData);
    httpController.verify();
  });

  it('forgot should call forgot api', () => {
    const testData: CustomResponse<any> = {
      code: 200,
      ok: true,
      result: null,
    };

    service.forgot('').subscribe(res => {
      expect(res).toBe(testData);
    })

    const request = httpController.expectOne({
      method: 'POST',
      url: `${environment.authServiceURL}/auth/forgot-password`,
    });

    request.flush(testData);
    httpController.verify();
  });

  it('reset should call reset api', () => {
    const testData: CustomResponse<any> = {
      code: 200,
      ok: true,
      result: null,
    };

    service.reset('', '').subscribe(res => {
      expect(res).toBe(testData);
    })

    const request = httpController.expectOne({
      method: 'POST',
      url: `${environment.authServiceURL}/auth/reset-password`,
    });

    request.flush(testData);
    httpController.verify();
  });

  it('register should call register api', () => {
    const testData: CustomResponse<any> = {
      code: 200,
      ok: true,
      result: null,
    };

    service.register('', '').subscribe(res => {
      expect(res).toBe(testData);
    })

    const request = httpController.expectOne({
      method: 'POST',
      url: `${environment.authServiceURL}/auth/register`,
    });

    request.flush(testData);
    httpController.verify();
  });

  it('updateMyUser should call user update api', () => {
    const testData: CustomResponse<any> = {
      code: 200,
      ok: true,
      result: null,
    };

    service.updateMyUser('', '', '').subscribe(res => {
      expect(res).toBe(testData);
    })

    const request = httpController.expectOne({
      method: 'PATCH',
      url: `${environment.authServiceURL}/users/me`,
    });

    request.flush(testData);
    httpController.verify();
  });

  it('getMyUser should call get user api', () => {
    const testData: CustomResponse<any> = {
      code: 200,
      ok: true,
      result: null,
    };

    service.getMyUser().subscribe(res => {
      expect(res).toBe(testData);
    })

    const request = httpController.expectOne({
      method: 'GET',
      url: `${environment.authServiceURL}/users/me`,
    });

    request.flush(testData);
    httpController.verify();
  });

  it('updateToken should update local storage', () => {
    Object.defineProperty(window, 'localStorage', { value: { setItem: jest.fn() } });
    service.updateToken('');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
