import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NavbarOptionDirective } from './ui-kit/lb-navbar-option/navbar-option.directive';
import { MaterialModule } from './material/material.module';



@NgModule({
  declarations: [
    NavbarOptionDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NavbarOptionDirective,
  ]
})
export class SharedModule { }
