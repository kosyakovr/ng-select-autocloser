/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NG_SELECT_AUTOCLOSE_OPTIONS, NgSelectsAutocloseService } from './ng-select-autoclose/ng-select-autoclose.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    NgSelectsAutocloseService,
    { // just example (actually copy of default params)
      provide: NG_SELECT_AUTOCLOSE_OPTIONS,
      useValue: {
        unfocus: true,
        autocloseIfScrollableIsWindow: true,
      }
    }
  ]
};
