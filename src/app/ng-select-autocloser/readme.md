# What is it
Angular-related package "@ng-select/ng-select" has an option to attach dropdown panel to body (appendTo="body").
There is an scroll issue with this option: dropdown's position when user scrolls outside of dropdown panel and scrollable container is not window but inner tag.

Issue described here:
https://github.com/ng-select/ng-select/issues/1130
https://github.com/ng-select/ng-select/issues/2456

Actualy any container with overflow hidden/auto may need <ng-select appendTo="body"> to correct dropdown displaying: scrollable panels, dialogs with scrollable bodies, pages with fixed headers, etc.

If I understood right, main reason why ng-select don't use backdrop layer to block scroll outside - it also will block search control, so search feature will not work.

There are some ways to handle the issue.


# Implementation

This solution implements auto close ng-select dropdown by scroll in closest scrollable container.

Code from our working project (Angular v19, zoneless change detection).
Code didn't checked with Angular versions < 19 and with server-side rendering.
Should work without changes in v17.2+ (with signal-based queries viewChildren()/contentChildren() and takeUntilDestroyed()).

Code checked in latest versions of Chrome & clones, Safari, Firefox.

Important note:
This implementation closes dropdown by scroll events.
If browser don't send scroll events by any reason, auto-close don't work:
  - scroll position already at the top but user still scrolls to top.
  - scroll position already at the bottom but user still scrolls to bottom.
  - no parent container with scroll for active ng-select.


## Base class NgSelectAutocloserBaseComponent

You should use it as base class, to add auto-close feature to any component with ng-selects in template.

We used it as base class for our dialog components.

Remember, that queries viewChildren/contentChildren works in template of current component and don't track ng-selects in <ng-template> and child components.

So you must add base class to **each** component with ng-selects inside.
Directive ngSelectsAutocloser is alternative (see below).


## Directives

Two directives are provided: ngSelectAutoclose and ngSelectsAutocloser


### Directive ngSelectsAutocloser

Use case: any template with ng-selects and tag-wrapper:
``` html
  <form ngSelectsAutocloser>
    <!-- ng-selects here -->
  </form>
```


### Directive ngSelectAutoclose

Recommended to use:
  - with single ng-selects
  - in templates without tag-wrapper

We used it in templates which rendered as part of grid container, like this:
``` html
  <ng-template ...> <!-- no wrapper tag here -->
    ...
    <label>Country</label>
    <ng-select ngSelectAutoclose></ng-select>

    <label>State</label>
    <ng-select ngSelectAutoclose></ng-select>
    ...
  </ng-template>
```


## Service NgSelectsAutocloserService

It provides an boolean observable anyNgSelectOpen$.

You can use it in any place where you need to know if any ng-select dropdown is open.

We used it to temporarily disable closing our CDK dialogs by esc / backdrop click while ng-select dropdown is open.


## Setup & Configuration
Register NgSelectsAutocloserService in providers section in app.config.ts

By default, on scroll, service closes opened dropdown panel and unfocus ng-select.


Unfocus feature implemented with ng-select's method blur().

It works OK on desktops but may not work in mobile browsers (by our tests).

You can change this behaviour with config options in app.config.ts:
``` typescript
  {
    provide: NG_SELECT_AUTOCLOSER_OPTIONS,
    useValue: {
      unfocus: false, // disable unfocus

      /*
        false: if scrollable container is window, dropdown will not be closed.
        In this case there is no issue with dropdown position on scroll.
      */
      autocloseIfScrollableIsWindow: false,
    },
  },
```

## Usage in components
Extend your component from base class:
``` typescript
@Component({
  ...
})
export class MyComponentWithNgSelects extends NgSelectAutocloserBaseComponent implements OnInit {
  // component code
}
```

Or import directive to use in template:
``` typescript
@Component({
  import: [
    ...
    NgSelectsAutocloserDirective,
  ],
  ...
})
export class MyComponentWithNgSelects implements OnInit {
}
```


## App styles

Strongly recommend to add CSS rule to your app styles.

It blocks overscroll body movement at edge scroll positions.
``` css
  html, body {
    overscroll-behavior: none;
  }
```


# Code notes

This code provided AS IS.

You can use this example in projects of any type and modify to match your needs.
