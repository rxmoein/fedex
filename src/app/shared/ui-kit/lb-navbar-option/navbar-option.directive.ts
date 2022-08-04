import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[lb-navbar-option]'
})
export class NavbarOptionDirective {
  @HostBinding('class') class = 'lb-navbar-option';
}
