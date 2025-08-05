import { Component, signal } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NgSelectsAutocloseDirective } from '../ng-select-autoclose/ng-select-autoclose.directive';
import { selectItems } from '../mock-data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-demo-directive',
  imports: [
    NgSelectsAutocloseDirective,
    NgSelectComponent,
    RouterLink,
  ],
  templateUrl: './demo-directive-2.component.html',
})
export class DemoDirective2Component {
  readonly testItems = signal(selectItems);
}
