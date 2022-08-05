import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { CustomErrorHandler } from '../../core/services/custom-error-handler.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SigninComponent {
  form: UntypedFormGroup = new UntypedFormGroup({});
  isLoading = false;

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private snackbar: SnackbarService,
    private errHandler: CustomErrorHandler,
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return this.snackbar.error('Please fill the form with valid information!')
    }

    try {
      this.form.disable();
      this.isLoading = true;
      const request$ = this.authService.login(this.form.value.username, this.form.value.password);
      const response = await lastValueFrom(request$);

      this.authService.updateToken(response.result.token);
      this.authService.updateLocalUser({
        id: response.result.user.id,
        firstName: response.result.user.first_name,
        lastName: response.result.user.last_name,
        roleId: response.result.user.role_id,
        status: response.result.user.status,
        username: response.result.user.username,
      });
      this.isLoading = false;
      this.form.enable();

      if (!response.result.user.profile_completed) {
        this.router.navigate(['routine', 'complete-profile']);
        return;
      }

      this.router.navigate(['u', this.authService.getUsername()]);
    } catch (error) {
      this.form.enable();
      this.isLoading = false;
      this.errHandler.handle(error);
    }
  }
}
