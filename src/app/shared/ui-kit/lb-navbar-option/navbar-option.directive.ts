import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[app-navbar-option]'
})
export class NavbarOptionDirective {
  @HostBinding('class') class = 'app-navbar-option';
}
