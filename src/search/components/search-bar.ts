import { Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
  <div click-target class="search-bar" [ngClass]="{'search-bar-open': open}" role="search"      
      (clickOutside)="handleClickOutside($event)" 
      (mousedownOutside)="handleMousedownOutside()"
      (mouseupOutside)="handleMouseupOutside()"
      >
    <form class="search-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
      <input 
        type="text"
        class="search-form-input"
        placeholder="Search Tracks"
        autocomplete="off"
        formControlName="search"
        maxlength="60"
        required>
    </form>
  </div>
  `,
  styles:[
    require('./search-bar.scss')
  ]
})
export class SearchBarComponent implements OnChanges, OnInit {
  @Input() open: boolean = false;

  form: FormGroup;
  searchInput: FormControl;
  searchInputEl: HTMLInputElement;

  constructor(public el: ElementRef, public formBuilder: FormBuilder, public router: Router) {}

  ngOnInit(): void {
    this.searchInput = new FormControl();

    this.form = this.formBuilder.group({
      search: this.searchInput
    });

    this.searchInputEl = this.el.nativeElement.querySelector('input');

    this.el.nativeElement
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
        console.log('Search value: ', value);
        this.router.navigate(['/search', { q: value }]);
        this.searchInputEl.blur();
      }
    }
  }

  handleClick(): void {
    console.log( "Clicked component!" );
  }

  handleClickOutside(event): void {
    // console.warn( "Clicked - outside - component: ", this.open, event );
    // this.open = !this.open;
    // if (this.open) {
    //   this.open = false;
    // }
    // if (this.open) {
    //   console.warn( "Clicked - outside - component!" );
    //   this.open = false;
    // }
  }

  handleMousedownOutside(): void {
    // console.warn( "Moused-Down - outside - component!" );

  }

  handleMouseupOutside(): void {
    // console.warn( "Moused-Up - outside - component!" );
  }
}