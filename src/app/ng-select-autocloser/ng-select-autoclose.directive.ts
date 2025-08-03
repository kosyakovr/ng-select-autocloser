import { DestroyRef, Directive, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NgSelectsAutocloserService } from './ng-select-autocloser.service';

/*
  Directive to auto-close one specific ng-select on parent container scroll.

  Recommended to use with ng-selects in templates.
  Use case: template without wrapper tag, to render in grid container, like this:
  <ng-template>
    <label>State</label> <ng-select ngSelectAutoclose></ng-select>
    <label>Country</label> <ng-select ngSelectAutoclose></ng-select>
  </ng-template>

  For components it's better to use base class NgSelectAutocloserBaseComponent or NgSelectsAutocloserDirective.
  They handles all ng-selects in the component's template.

  If you add this directive to other tag than <ng-select>, you will get NullInjectorError error.
*/

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngSelectAutoclose]',
})
export class NgSelectAutocloseDirective implements OnInit {
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly autocloserService = inject(NgSelectsAutocloserService);
  protected readonly ngSelect = inject(NgSelectComponent);

  ngOnInit(): void {
    this.ngSelect.openEvent
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.autocloserService.setNgSelectOnParentScrollListener(this.ngSelect));

    this.ngSelect.closeEvent
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.autocloserService.removeNgSelectOnParentScrollListener(this.ngSelect));
  }
}
