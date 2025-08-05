import { DestroyRef, inject, Injectable, InjectionToken, RendererFactory2 } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgSelectComponent } from '@ng-select/ng-select';
import { getScrollParent } from './scroll-utils';
import { BehaviorSubject, Subject, throttleTime } from 'rxjs';

interface NgSelectItem {
  ngSel: NgSelectComponent;
  unlisten: () => void;
}

export interface NgSelectsAutocloseOptions {
  unfocus?: boolean;
  autocloseIfScrollableIsWindow?: boolean;
}

export const NG_SELECT_AUTOCLOSE_OPTIONS = new InjectionToken<NgSelectsAutocloseOptions>(
  'NG_SELECT_AUTOCLOSE_OPTIONS',
  {
    factory: () => ({
      unfocus: true,
      autocloseIfScrollableIsWindow: true,
    }),
  },
);

@Injectable({ providedIn: 'root' })
export class NgSelectsAutocloseService {
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly options = inject(NG_SELECT_AUTOCLOSE_OPTIONS);
  protected renderer = inject(RendererFactory2).createRenderer(null, null);

  protected openedNgSelect: NgSelectItem | null = null;
  protected ngSelectParentScrolled = new Subject<void>();

  protected anyNgSelectOpen = new BehaviorSubject<boolean>(false);
  readonly anyNgSelectOpen$ = this.anyNgSelectOpen.asObservable();

  constructor() {
    this.initParentScrollListener();
  }

  protected initParentScrollListener() {
    this.ngSelectParentScrolled
      .pipe(
        throttleTime(20),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        if (this.openedNgSelect?.ngSel.isOpen) {
          this.openedNgSelect.unlisten();

          if (this.options.unfocus) {
            this.openedNgSelect.ngSel.blur();
          }

          this.openedNgSelect.ngSel.close();
          this.openedNgSelect = null;
          this.anyNgSelectOpen.next(false);
        }
      });
  }

  setParentScrollListener(ngSel: NgSelectComponent) {
    this.anyNgSelectOpen.next(true);

    if (this.openedNgSelect) {
      this.openedNgSelect.unlisten();
      this.openedNgSelect = null;
    }

    let scrollParent: Element | Window = getScrollParent(ngSel.element);

    if (!scrollParent) return;

    if (this.options.autocloseIfScrollableIsWindow && scrollParent.tagName === 'HTML') {
      scrollParent = window;
    }

    this.openedNgSelect = {
      ngSel,
      unlisten: this.renderer.listen(
        scrollParent,
        'scroll',
        () => this.ngSelectParentScrolled.next(),
      ),
    };
  }

  removeParentScrollListener(ngSel: NgSelectComponent) {
    if (this.openedNgSelect?.ngSel === ngSel) {
      this.openedNgSelect.unlisten();
      this.openedNgSelect = null;
      this.anyNgSelectOpen.next(false);
    }
  }
}
