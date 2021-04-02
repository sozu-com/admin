// third party libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CalendarModule } from 'primeng/primeng';

// general components
import { BanksComponent } from './banks.component';
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { BankLeadsComponent } from './bank-leads/bank-leads.component';
import { BankLeadDetailsComponent } from './bank-leads/bank-lead-details/bank-lead-details.component';
import { SharedModule } from 'src/app/modules/shared.module';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
  {
    path: 'view-banks', component: BanksComponent,
    canActivate: [AclUserGuard], data: { roles: ['Bank Management', 'can_read', 'can_bank'] }
  },
  // all leads
  {
    path: 'bank-leads', component: BankLeadsComponent,
    canActivate: [AclUserGuard], data: { roles: ['Bank Lead Management', 'can_read', 'can_bank'] }
  },

  // leads wrt particular bank
  {
    path: 'view-bank-leads/:id', component: BankLeadsComponent,
    canActivate: [AclUserGuard], data: { roles: ['Bank Lead Management', 'can_read', 'can_bank'] }
  },

  // bank lead details
  {
    path: 'bank-leads/:id', component: BankLeadDetailsComponent,
    canActivate: [AclUserGuard], data: { roles: ['Bank Lead Management', 'can_read', 'can_bank'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxSpinnerModule,
    LazyLoadImageModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    NgxChartsModule,
    SharedModule,
    CalendarModule,
    TranslateModule
  ],
  declarations: [
    BanksComponent,
    BankLeadsComponent,
    BankLeadDetailsComponent
  ]
})

export class BanksModule { }
