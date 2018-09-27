import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesComponent } from './properties.component';
import { Routes, RouterModule } from '@angular/router';
import { AddPropertyComponent } from './add-property/add-property.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { AgmCoreModule } from '@agm/core';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { ThousandPipe } from './../../pipes/thousand.pipe';
import { AclUserGuard } from '../../guards/acl-user.guard';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  { path: 'details/:property_id', component: PropertyDetailsComponent,
    canActivate: [AclUserGuard], data: {roles: ['Property Management', 'can_read', '']}},
  { path: 'add-property/:property_id', component: AddPropertyComponent,
    canActivate: [AclUserGuard], data: {roles: ['Property Management', 'can_update', '']}},
  { path: 'edit-property/:property_id', component: AddPropertyComponent,
    canActivate: [AclUserGuard], data: {roles: ['Property Management', 'can_update', '']}},
  { path: 'edit-property/:property_id/:edit', component: AddPropertyComponent,
    canActivate: [AclUserGuard], data: {roles: ['Property Management', 'can_update', '']}},
  { path: 'view-properties', component: PropertiesComponent,
    canActivate: [AclUserGuard], data: {roles: ['Property Management', 'can_read', '']}}
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
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCYv_zELZGVo2Ehzgp8eh8UeSIidhMCmH8',
        libraries: ['drawing', 'places']
      }),
    Ng2TelInputModule,
    NgxPaginationModule
  ],
  declarations: [
    PropertiesComponent,
    AddPropertyComponent,
    PropertyDetailsComponent,
    // ThousandPipe
  ]
})

export class PropertiesModule { }
