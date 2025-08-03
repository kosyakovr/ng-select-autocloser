import { Component, signal } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NgSelectAutocloserBaseComponent } from '../ng-select-autocloser/ng-select-autocloser-base.component';
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
export class DemoBaseComponent extends NgSelectAutocloserBaseComponent {
  readonly testItems = signal(selectItems);
}
