import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { BanksComponent } from './banks.component';
import { AclUserGuard } from '../../guards/acl-user.guard';
import { BankLeadsComponent } from './bank-leads/bank-leads.component';
import { BankLeadDetailsComponent } from './bank-leads/bank-lead-details/bank-lead-details.component';
import { SharedModule } from '../../modules/shared.module';


const routes: Routes = [
  { path: 'view-banks', component: BanksComponent,
    canActivate: [AclUserGuard], data: {roles: ['Bank Management', 'can_read', 'can_bank']}},
  { path: 'bank-leads', component: BankLeadsComponent,
    canActivate: [AclUserGuard], data: {roles: ['Bank Lead Management', 'can_read', 'can_bank']}},
  { path: 'bank-leads/:id', component: BankLeadDetailsComponent,
    canActivate: [AclUserGuard], data: {roles: ['Bank Lead Management', 'can_read', 'can_bank']}}
];

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
    SharedModule
  ],
  declarations: [
    BanksComponent,
    BankLeadsComponent,
    BankLeadDetailsComponent
  ]
})

export class BanksModule { }
