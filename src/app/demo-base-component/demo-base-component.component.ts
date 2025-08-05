import { Component, signal } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NgSelectAutocloseBaseComponent } from '../ng-select-autoclose/ng-select-autoclose-base.component';
import { RouterLink } from '@angular/router';
import { selectItems } from '../mock-data';

@Component({
  selector: 'app-demo-base-component',
  imports: [
    NgSelectComponent,
    RouterLink,
  ],
  templateUrl: './demo-base-component.component.html',
})
export class DemoBaseComponent extends NgSelectAutocloseBaseComponent {
  readonly testItems = signal(selectItems);
}
