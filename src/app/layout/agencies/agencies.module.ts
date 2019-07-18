// third party libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { AgmCoreModule } from '@agm/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AclUserGuard } from '../../guards/acl-user.guard';
import { SharedModule } from '../../modules/shared.module';
import { AgenciesComponent } from './agencies.component';
import { AddAgencyComponent } from './add-agency/add-agency.component';

const routes: Routes = [
  { path: '', component: AgenciesComponent,
    canActivate: [AclUserGuard], data: {roles: ['User Management', 'can_read', '']}},
  { path: 'add-agency/:id', component: AddAgencyComponent,
    canActivate: [AclUserGuard], data: {roles: ['User Management', 'can_read', '']}}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.rectangleBounce,
      primaryColour: '#00B96F'
    }),

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
      libraries: ['drawing', 'places']
    }),
    LazyLoadImageModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    SharedModule
  ],
  declarations: [
    AgenciesComponent,
    AddAgencyComponent
  ]
})

export class AgenciesModule { }
