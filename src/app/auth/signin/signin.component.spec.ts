import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';

import { AuthContainerComponent } from '../shared/auth-container/auth-container.component';
import { AuthContentComponent } from '../shared/auth-content/auth-content.component';
import { AuthFooterComponent } from '../shared/auth-footer/auth-footer.component';
import { LoginResponseDTO } from '../../core/models/authentication';
import { environment } from '../../../environments/environment';
import { CustomResponse } from '../../core/models/response';
import { SigninComponent } from './signin.component';
import { Router } from '@angular/router';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let httpController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SigninComponent,
        AuthContainerComponent,
        AuthContentComponent,
        AuthFooterComponent,
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'u/:username',
            component: SigninComponent,
          }
        ]),
        ReactiveFormsModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ]
    })
      .compileComponents();

    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be initialized', () => {
    expect(component.form).toBeTruthy();
  });

  it('createForm should create form group', () => {
    component['fb'].group = jest.fn();
    component['createForm']();
    expect(component['fb'].group).toHaveBeenCalled();
  });

  it('onSubmit should not call api if form invalid', () => {
    component.form = { invalid: true } as any;
    component.onSubmit();
    httpController.expectNone({
      method: 'POST',
      url: `${environment.authServiceURL}/auth/login`,
    });
  });

  it('onSubmit should call api if form is valid', () => {
    component.form = {
      invalid: false,
      value: {
        username: 'username',
        password: 'password',
      },
      enable: jest.fn(),
      disable: jest.fn(),
    } as any;

    const testData: CustomResponse<LoginResponseDTO> = {
      code: 200,
      ok: true,
      result: {
        token: 'test',
        user: {
          id: 0,
          first_name: 'first',
          last_name: 'last',
          profile_completed: true,
          role_id: 2,
          status: 2,
          username: 'username'
        }
      }
    };

    jest.spyOn(component['router'], 'navigate');
    component.onSubmit();

    const request = httpController.expectOne({
      method: 'POST',
      url: `${environment.authServiceURL}/auth/login`,
    });

    request.flush(testData);
    httpController.verify();
  });
});
