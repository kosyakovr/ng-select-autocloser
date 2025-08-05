import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgSelectComponent } from '@ng-select/ng-select';
import { debounceTime, Observable, Subscription } from 'rxjs';
import { NgSelectsAutocloserService } from './ng-select-autocloser.service';

interface NgSelectSubscription {
  open: Subscription;
  close: Subscription;
}

/**
 * Base class for internal usage.
 */
export class NgSelectsAutocloserInternalBase {
  protected subscriptions: NgSelectSubscription[] = [];

  protected initAutocloser(
    ngSelects$: Observable<readonly NgSelectComponent[]>,
    destroyRef: DestroyRef,
    autocloserService: NgSelectsAutocloserService,
  ) {
    ngSelects$
      .pipe(
        debounceTime(50),
        takeUntilDestroyed(destroyRef),
      )
      .subscribe((ngSelects) => {
        this.subscriptions.forEach((s) => {
          s.open.unsubscribe();
          s.close.unsubscribe();
        });

        this.subscriptions = ngSelects.map((ngSelect): NgSelectSubscription => {
          return {
            open: ngSelect.openEvent
              .pipe(takeUntilDestroyed(destroyRef))
              .subscribe(() => autocloserService.setNgSelectOnParentScrollListener(ngSelect)),
            close: ngSelect.closeEvent
              .pipe(takeUntilDestroyed(destroyRef))
              .subscribe(() => autocloserService.removeNgSelectOnParentScrollListener(ngSelect)),
          };
        });
      });
  }
}
