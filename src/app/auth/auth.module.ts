import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthContainerComponent } from './shared/auth-container/auth-container.component';
import { AuthContentComponent } from './shared/auth-content/auth-content.component';
import { AuthFooterComponent } from './shared/auth-footer/auth-footer.component';
import { AuthComponent } from './auth.component';


@NgModule({
  declarations: [
    AuthContainerComponent,
    AuthContentComponent,
    AuthFooterComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
