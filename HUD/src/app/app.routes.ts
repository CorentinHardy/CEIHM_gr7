import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

import {Hud1Component} from "./hud1/hud1.component";
import {Hud2Component} from "./hud2/hud2.component";

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'hud1',  component: Hud1Component },
  { path: 'hud2',  component: Hud2Component },
  { path: 'home',  component: HomeComponent },
  { path: '**',    component: NoContentComponent },
];
/*  { path: 'about', component: AboutComponent },*/
/*  { path: 'detail', loadChildren: './+detail#DetailModule'},*/
/*  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},*/
