import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared'

import { TracklistComponent } from './tracklist';
import { TrackCardComponent } from './tracklist-card';
import { TracklistItemsComponent } from './tracklist-items';


@NgModule({
  declarations: [
    TracklistComponent,
    TrackCardComponent,
    TracklistItemsComponent
  ],
  exports: [
    TracklistComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ]
})
export class TracklistModule { }