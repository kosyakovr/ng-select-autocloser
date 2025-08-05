import { Component, signal } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NgSelectAutocloseThisDirective } from '../ng-select-autoclose/ng-select-autoclose-this.directive';
import { selectItems } from '../mock-data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-demo-directive',
  imports: [
    NgSelectAutocloseThisDirective,
    NgSelectComponent,
    RouterLink,
  ],
  templateUrl: './demo-directive-1.component.html',
})
export class DemoDirective1Component {
  readonly testItems = signal(selectItems);
}
