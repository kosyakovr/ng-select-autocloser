import { Component, signal } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NgSelectsAutocloserDirective } from '../ng-select-autocloser/ng-select-autocloser.directive';
import { selectItems } from '../mock-data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-demo-directive',
  imports: [
    NgSelectsAutocloserDirective,
    NgSelectComponent,
    RouterLink,
  ],
  templateUrl: './demo-directive.component.html',
})
export class DemoDirectiveComponent {
  readonly testItems = signal(selectItems);
}
