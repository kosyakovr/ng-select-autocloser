import { Routes } from '@angular/router';
import { DemoBaseComponent } from './demo-base-component/demo-base-component.component';
import { DemoDirectiveComponent } from './demo-directive/demo-directive.component';

export const routes: Routes = [
  {
    path: 'demo-component',
    component: DemoBaseComponent,
  },
  {
    path: 'demo-directive',
    component: DemoDirectiveComponent,
  },
  {
    path: '**',
    redirectTo: 'demo-directive',
  }
];
