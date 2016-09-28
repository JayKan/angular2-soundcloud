import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';
import { TracklistModule } from '../tracklist';

import { SearchActions } from './serach-actions';



export { SearchActions };
export { SearchState } from './reducers/search-state';

@NgModule({
  declarations: [

  ],
  imports: [
    // EffectsModule.run
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    SearchActions
  ],
  exports: [

  ]
})
export class SearchModule {}