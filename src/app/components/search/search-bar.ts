import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  OnChanges,
  OnInit
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
  <div class="search-bar" [ngClass]="{'search-bar--open': open}" role="search">
    <form class="search-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
      <input 
        type="text"
        autocomplete="off"
        class="search-form__input"
        formControlName="search"
        maxlength="60"
        placeholder="Search Tracks"
        required>
    </form>
  </div>
  `,
  styles: [
    require('./search-bar.scss')
  ]
})
export class SearchBarComponent implements OnInit, OnChanges {

  @Input() open: boolean = false;

  form: FormGroup;
  searchInput: FormControl;
  searchInputEl: HTMLInputElement;

  constructor(private _el: ElementRef, private _fb: FormBuilder, private _router: Router) {}

  ngOnInit(): void {
    this.searchInput = new FormControl();

    this.form = this._fb.group({
      search: this.searchInput
    });

    this.searchInputEl = this._el.nativeElement.querySelector('input');

    this._el.nativeElement
      .querySelector('.search-bar')
      .addEventListener('transitionend', () => {
        if (this.open) {
          this.searchInputEl.focus();
        }
      }, false);
  }

  ngOnChanges(changes: any): void {
    if (changes.open.currentValue) {
      this.searchInput.setValue('');
    }
  }

  submit(): void {
    if (this.form.valid) {
      const value = this.searchInput.value.trim();
      if (value.length) {
        // this._router.navigate(['/search', {q: value}]);
        // this.searchInputEl.blur();
      }
    }
  }
}