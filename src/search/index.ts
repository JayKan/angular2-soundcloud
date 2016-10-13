import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';
import { TracklistModule } from '../../tracklist';

import { SearchBarComponent } from './components/search-bar';
import { SearchPageComponent } from './pages/search-page';

import { SearchActions } from './serach-actions';
import { SearchEffects } from './search-effects';
import { SearchService } from './search-service';

export { SearchActions, SearchService };
export { searchReducer } from './reducers/search-reducer';
export { SearchState } from './reducers/search-state';

const routes: Routes = [
  { path: 'search', component: SearchPageComponent }
];

@NgModule({
  declarations: [
    SearchBarComponent,
    SearchPageComponent
  ],
  exports: [
    SearchBarComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    // TracklistModule,

    EffectsModule.run(SearchEffects),
    RouterModule.forChild(routes)
  ],
  providers: [
    SearchActions,
    SearchService
  ]
})
export class SearchModule { }