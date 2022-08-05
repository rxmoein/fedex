import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthContainerComponent } from './shared/auth-container/auth-container.component';
import { AuthContentComponent } from './shared/auth-content/auth-content.component';
import { AuthFooterComponent } from './shared/auth-footer/auth-footer.component';
import { SigninComponent } from './signin/signin.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [
    AuthContainerComponent,
    AuthContentComponent,
    AuthFooterComponent,
    AuthComponent,
    SigninComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ]
})
export class AuthModule { }
