import { RouterModule, Routes } from '@angular/router';
import { PlantComponent } from './plant/plant.component';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path: '', component:HomepageComponent},
    { path:'plant', component:PlantComponent}
  
];
