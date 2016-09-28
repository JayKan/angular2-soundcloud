import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// custom app related modules
import { SharedModule } from './shared';
import { HomePageModule } from './home';

import { AppComponent } from './app';
import { AppHeaderComponent } from './components/app-header';

import { PlayerState, TimesState } from './player';
import { SearchState } from './search';
import { TracklistsState, TracksState } from './tracklist';
import { UsersState } from './users';

export interface AppState {
  player: PlayerState;
  search: SearchState;
  times: TimesState;
  tracklists: TracklistsState;
  tracks: TracksState;
  users: UsersState;
}

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { useHash: false }),

    SharedModule,
    HomePageModule
  ]
})
export class AppModule {}



