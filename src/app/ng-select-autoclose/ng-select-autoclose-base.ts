/* eslint-disable @smarttools/rxjs/no-nested-subscribe */
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgSelectComponent } from '@ng-select/ng-select';
import { debounceTime, Observable, Unsubscribable } from 'rxjs';
import { NgSelectsAutocloseService } from './ng-select-autoclose.service';

/**
 * Base class for internal usage.
 */
export class NgSelectsAutocloseInternalBase {
  protected subscriptions: Unsubscribable[] = [];

  protected initAutocloser(
    ngSelects$: Observable<readonly NgSelectComponent[]>,
    destroyRef: DestroyRef,
    autocloserService: NgSelectsAutocloseService,
  ) {
    ngSelects$
      .pipe(
        debounceTime(50),
        takeUntilDestroyed(destroyRef),
      )
      .subscribe((ngSelects) => {
        this.unsubscribeAutocloser();

        ngSelects.forEach((ngSelect) => {
          this.subscriptions.push(
            ngSelect.openEvent.subscribe(() => autocloserService.setParentScrollListener(ngSelect)),
            ngSelect.closeEvent.subscribe(() => autocloserService.removeParentScrollListener(ngSelect)),
          );
        });
      });

    destroyRef.onDestroy(() => this.unsubscribeAutocloser());
  }

  protected unsubscribeAutocloser() {
    this.subscriptions.forEach((s) => s.unsubscribe());
    this.subscriptions = [];
  }
}
