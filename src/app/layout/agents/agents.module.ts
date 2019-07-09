// third party libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { AgmCoreModule } from '@agm/core';

import { AclUserGuard } from '../../guards/acl-user.guard';
import { SharedModule } from '../../modules/shared.module';
import { AgentsComponent } from './agents.component';
import { AddAgentComponent } from './add-agent/add-agent.component';

const routes: Routes = [
  { path: '', component: AgentsComponent,
    canActivate: [AclUserGuard], data: {roles: ['User Management', 'can_read', '']}},
  { path: 'add-agent/:id', component: AddAgentComponent,
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
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    SharedModule
  ],
  declarations: [
    AgentsComponent,
    AddAgentComponent
  ]
})

export class AgentsModule { }
