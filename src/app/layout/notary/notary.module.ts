import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';

import { NotaryLeadsComponent } from './notary-leads/notary-leads.component';
import { NotaryComponent } from './notary.component';
import { NotaryLeadsDetailsComponent } from './notary-leads/notary-leads-details/notary-leads-details.component';
import { AclUserGuard } from '../../guards/acl-user.guard';
import { SharedModule } from '../../modules/shared.module';
import { AuthGuard } from '../../guards/auth.guard';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const routes: Routes = [
  { path: 'view-notary', component: NotaryComponent,
    canActivate: [AclUserGuard], data: {roles: ['Noataries Management', 'can_read', 'can_noatary']}},
  { path: 'notary-leads', component: NotaryLeadsComponent,
    canActivate: [AclUserGuard], data: {roles: ['Notary Lead Management', 'can_read', 'can_noatary']}},
  { path: 'notary-leads/:id', component: NotaryLeadsDetailsComponent,
    canActivate: [AclUserGuard], data: {roles: ['Notary Lead Management', 'can_read', 'can_noatary']}}
];

// const routes: Routes = [
//   { path: 'view-notary', component: NotaryComponent,
//     canActivate: [AuthGuard], data: {roles: ['Noataries Management', 'can_read', '']}},
//   { path: 'notary-leads', component: NotaryLeadsComponent,
//     canActivate: [AuthGuard], data: {roles: ['Notary Lead Management', 'can_read', '']}},
//   { path: 'notary-leads/:id', component: NotaryLeadsDetailsComponent,
//     canActivate: [AuthGuard], data: {roles: ['Notary Lead Management', 'can_read', '']}}
// ];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.rectangleBounce,
      primaryColour: '#00B96F'
    }),
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    NgxChartsModule,
    SharedModule
  ],
  declarations: [
    NotaryComponent,
    NotaryLeadsComponent,
    NotaryLeadsDetailsComponent
  ]
})

export class NotaryModule { }
