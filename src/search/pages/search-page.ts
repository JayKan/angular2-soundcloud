import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/takeUntil';

import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { SearchService } from '../search-service';

@Component({
  selector: 'search-page',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
  <section>            
     <content-header
      [section]="section"
      [title]="search.query$ | async">      
    </content-header>
    <tracklist></tracklist>
  </section>
  `
})
export class SearchPageComponent implements OnDestroy {
  ngDestroy$: Subject<boolean> = new Subject<boolean>();
  section: string = 'Search Results';

  constructor(public route: ActivatedRoute, public search: SearchService) {
    route.params
      .takeUntil(this.ngDestroy$)
      .pluck('q')
      .subscribe((value: string) => search.loadSearchResults(value));
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
  }
}