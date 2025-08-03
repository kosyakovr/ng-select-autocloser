import { contentChildren, DestroyRef, Directive, inject, OnInit } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NgSelectsAutocloserService } from './ng-select-autocloser.service';
import { NgSelectsAutocloserBase } from './ng-select-autocloser-base';

/*
  Directive to auto-close child ng-selects on parent container scroll.

  Use case: any template with ng-selects:
  <form ngSelectsAutocloser>
    <label>Vehicle Type</label> <ng-select></ng-select>
    <label>Manufacturer</label> <ng-select></ng-select>
  </form>

  Also you can use base class NgSelectAutocloserBaseComponent.

  If you need to auto-close one specific ng-select, use ngSelectAutocloseDirective.
*/

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngSelectsAutocloser]',
})
export class NgSelectsAutocloserDirective extends NgSelectsAutocloserBase implements OnInit {
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly autocloserService = inject(NgSelectsAutocloserService);

  protected readonly ngSelects = contentChildren(NgSelectComponent, { descendants: true });
  protected readonly ngSelects$ = toObservable(this.ngSelects);

  ngOnInit(): void {
    this.initAutocloser(this.ngSelects$, this.destroyRef, this.autocloserService);
  }
}
