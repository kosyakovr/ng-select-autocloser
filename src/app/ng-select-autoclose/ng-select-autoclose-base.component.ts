import { ChangeDetectionStrategy, Component, DestroyRef, inject, viewChildren } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NgSelectsAutocloseService } from './ng-select-autoclose.service';
import { NgSelectsAutocloseInternalBase } from './ng-select-autoclose-base';

/**
 * Base class to add auto-close feature to components with ng-selects in template.
 *
 * Use case: base class for dialog components.
 */
@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgSelectAutocloseBaseComponent extends NgSelectsAutocloseInternalBase {
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly autocloserService = inject(NgSelectsAutocloseService);

  protected readonly ngSelects = viewChildren(NgSelectComponent);
  protected readonly ngSelects$ = toObservable(this.ngSelects);

  constructor() {
    super();
    this.initAutocloser(this.ngSelects$, this.destroyRef, this.autocloserService);
  }
}
