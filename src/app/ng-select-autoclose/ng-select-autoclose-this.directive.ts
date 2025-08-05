import { DestroyRef, Directive, inject, OnInit } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NgSelectsAutocloseService } from './ng-select-autoclose.service';
import { NgSelectsAutocloseInternalBase } from './ng-select-autoclose-base';
import { of } from 'rxjs';

/*
  Directive to auto-close one specific ng-select on parent container scroll.

  Recommended to use with ng-selects in templates.
  Use case: template without wrapper tag, to render in grid container, like this:
  <ng-template>
    <label>State</label> <ng-select ngselAutocloseThis></ng-select>
    <label>Country</label> <ng-select ngselAutocloseThis></ng-select>
  </ng-template>

  For components it's better to use base class NgSelectAutocloseBaseComponent or NgSelectsAutocloseDirective.
  They handles all ng-selects in the component's template.

  This directive must be added only to tag <ng-select>, otherwise you will get NullInjectorError.
*/

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngselAutocloseThis]',
})
export class NgSelectAutocloseThisDirective extends NgSelectsAutocloseInternalBase implements OnInit {
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly autocloserService = inject(NgSelectsAutocloseService);
  protected readonly ngSelect = inject(NgSelectComponent);

  ngOnInit(): void {
    this.initAutocloser(
      of([this.ngSelect]),
      this.destroyRef,
      this.autocloserService,
    );
  }
}
