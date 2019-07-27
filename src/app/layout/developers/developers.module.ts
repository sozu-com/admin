// third party libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { AgmCoreModule } from '@agm/core';

import { AclUserGuard } from '../../guards/acl-user.guard';
import { SharedModule } from '../../modules/shared.module';
import { DevelopersComponent } from './developers.component';
import { AddDeveloperComponent } from './add-developer/add-developer.component';

const routes: Routes = [
  { path: '', component: DevelopersComponent,
    canActivate: [AclUserGuard], data: {roles: ['User Management', 'can_read', '']}},
  { path: 'add-developer/:id', component: AddDeveloperComponent,
    canActivate: [AclUserGuard], data: {roles: ['User Management', 'can_read', '']}}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
      libraries: ['drawing', 'places']
    }),
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    SharedModule
  ],
  declarations: [
    DevelopersComponent,
    AddDeveloperComponent
  ]
})

export class DevelopersModule { }
