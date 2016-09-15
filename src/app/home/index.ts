import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SharedModule } from '../../shared'
import { TracklistModule } from '../.';

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
    // TracklistModule
  ]
})
export class HomePageModule { }