import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { BanksComponent } from './banks.component';
import { AclUserGuard } from '../../guards/acl-user.guard';
import { BankLeadsComponent } from './bank-leads/bank-leads.component';
import { BankLeadDetailsComponent } from './bank-leads/bank-lead-details/bank-lead-details.component';
import { SharedModule } from '../../modules/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CalendarModule } from 'primeng/primeng';


const routes: Routes = [
  { path: 'view-banks', component: BanksComponent,
    canActivate: [AclUserGuard], data: {roles: ['Bank Management', 'can_read', 'can_bank']}},
  // all leads
  { path: 'bank-leads', component: BankLeadsComponent,
    canActivate: [AclUserGuard], data: {roles: ['Bank Lead Management', 'can_read', 'can_bank']}},

  // leads wrt particular bank
  { path: 'view-bank-leads/:id', component: BankLeadsComponent,
  canActivate: [AclUserGuard], data: {roles: ['Bank Lead Management', 'can_read', 'can_bank']}},

  // bank lead details
  { path: 'bank-leads/:id', component: BankLeadDetailsComponent,
    canActivate: [AclUserGuard], data: {roles: ['Bank Lead Management', 'can_read', 'can_bank']}}
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
    BanksComponent,
    BankLeadsComponent,
    BankLeadDetailsComponent
  ]
})

export class BanksModule { }
