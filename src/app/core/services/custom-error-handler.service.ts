import { Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandler {
  constructor(private snackbar: SnackbarService) { }

  handle(err: any) {
    switch (err?.error?.message) {
      case 'can_not_modify_super_user': this.snackbar.error('You are not allowed to update super user!'); break;
      case 'invalid_body': this.snackbar.error('You are sending invalid information!'); break;
      case 'invalid_credentials': this.snackbar.error('The credentials are incorrect!'); break;
      case 'internal_server_error': this.snackbar.error('OOps something went wrong! Please try again later.'); break;
      case 'not_found': this.snackbar.error('We could not find this item!'); break;
      case 'not_authorized': this.snackbar.error('You are not authorized to access this content!'); break;
      case 'token_expired': this.snackbar.error('Your session is expired. Please login again.'); break;
      case 'invalid_otp': this.snackbar.error('The OTP is incorrect! Are you sure?'); break;
      case 'token_required': this.snackbar.error('Token is required for this operation!'); break;
      case 'still_have_active_reset_pass_link': this.snackbar.error('You can\'t send a request right now. Please try later!'); break;
      case 'email_must_be_verified': this.snackbar.error('Please verify your email first! If you don\'t have the email try resetting your password'); break;
      case 'duplicated_entry': this.snackbar.error('You can not create duplicated entry!'); break;
      case 'protected_entry': this.snackbar.error('This entry is protected!'); break;

      default:
        this.snackbar.error('OOps! something went wrong! Please try again later!');
        break;
    }
  }
}
