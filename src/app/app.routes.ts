import { Routes } from '@angular/router';
import { DemoBaseComponent } from './demo-base-component/demo-base-component.component';
import { DemoDirective1Component } from './demo-directive-1/demo-directive-1.component';
import { DemoDirective2Component } from './demo-directive-2/demo-directive-2.component';

export const routes: Routes = [
  {
    path: 'demo-component',
    component: DemoBaseComponent,
  },
  {
    path: 'demo-directive-1',
    component: DemoDirective1Component,
  },
  {
    path: 'demo-directive-2',
    component: DemoDirective2Component,
  },
  {
    path: '**',
    redirectTo: 'demo-directive-2',
  }
];
