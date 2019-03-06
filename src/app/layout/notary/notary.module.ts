import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';

import { NotaryLeadsComponent } from './notary-leads/notary-leads.component';
import { NotaryComponent } from './notary.component';
import { NotaryLeadsDetailsComponent } from './notary-leads/notary-leads-details/notary-leads-details.component';
import { AclUserGuard } from '../../guards/acl-user.guard';
import { SharedModule } from '../../modules/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CalendarModule } from 'primeng/primeng';

const routes: Routes = [
  { path: 'view-notary', component: NotaryComponent,
    canActivate: [AclUserGuard], data: {roles: ['Noataries Management', 'can_read', 'can_noatary']}},

  // all leads
  { path: 'notary-leads', component: NotaryLeadsComponent,
    canActivate: [AclUserGuard], data: {roles: ['Notary Lead Management', 'can_read', 'can_noatary']}},

  // leads wrt particular notary
  { path: 'view-notary-leads/:id', component: NotaryLeadsComponent,
    canActivate: [AclUserGuard], data: {roles: ['Notary Lead Management', 'can_read', 'can_noatary']}},

    // details
  { path: 'notary-leads/:id', component: NotaryLeadsDetailsComponent,
    canActivate: [AclUserGuard], data: {roles: ['Notary Lead Management', 'can_read', 'can_noatary']}}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.rectangleBounce,
      primaryColour: '#00B96F'
    }),
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    NgxChartsModule,
    SharedModule,
    CalendarModule
  ],
  declarations: [
    NotaryComponent,
    NotaryLeadsComponent,
    NotaryLeadsDetailsComponent
  ]
})

export class NotaryModule { }
