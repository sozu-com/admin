import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesComponent } from './properties.component';
import { Routes, RouterModule } from '@angular/router';
import { AddPropertyComponent } from './add-property/add-property.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

const routes: Routes = [
  { path: 'add-property', component: AddPropertyComponent },
  { path: 'view-properties', component: PropertiesComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.rectangleBounce,
        primaryColour: '#00B96F'
    }),
  ],
  declarations: [
    PropertiesComponent,
    AddPropertyComponent
  ]
})

export class PropertiesModule { }
