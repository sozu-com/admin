import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';

import { ManualLeadsComponent } from './manual-leads.component';
import { ManualLeadDetailsComponent } from './manual-lead-details/manual-lead-details.component';
import { SharedModule } from '../../modules/shared.module';
import { AclUserGuard } from '../../guards/acl-user.guard';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  // { path: '', component: ManualLeadsComponent }
  { path: 'view-all', component: ManualLeadsComponent,
    canActivate: [AclUserGuard], data: {roles: ['Manual Leads', 'can_read', '']}},
  { path: 'view-details/:id', component: ManualLeadDetailsComponent,
    canActivate: [AclUserGuard], data: {roles: ['Manual Leads', 'can_read', '']}}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    MalihuScrollbarModule.forRoot(),
    SharedModule
  ],
  declarations: [
    ManualLeadsComponent,
    ManualLeadDetailsComponent
  ]
})

export class ManualLeadsModule { }
