import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared'
import { TracklistModule } from '../../tracklist';

import { HomePageComponent } from './home';

const routes: Routes = [
  { path: '', component: HomePageComponent }
];

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    SharedModule,
    TracklistModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeModule {}