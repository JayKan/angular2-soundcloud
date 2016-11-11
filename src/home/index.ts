import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'src/shared';
import { TracklistModule } from 'src/tracklists';

import { HomePageComponent } from './home';

const routes: Routes = [
  { path: '', component: HomePageComponent }
];

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    TracklistModule
  ]
})
export class HomeModule {}