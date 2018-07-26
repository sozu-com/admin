import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesComponent } from './properties.component';
import { Routes, RouterModule } from '@angular/router';
import { AddPropertyComponent } from './add-property/add-property.component';

const routes: Routes = [
  { path: 'add-property', component: AddPropertyComponent },
  { path: 'view-properties', component: PropertiesComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [
    PropertiesComponent,
    AddPropertyComponent
  ]
})

export class PropertiesModule { }
