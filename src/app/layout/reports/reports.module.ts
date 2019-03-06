// third party libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CalendarModule } from 'primeng/primeng';

// general components
import { ReportsComponent } from './reports.component';
import { SellerComponent } from './seller/seller.component';
import { BuyerComponent } from './buyer/buyer.component';
import { NotaryComponent } from './notary/notary.component';
import { BankComponent } from './bank/bank.component';
import { AclUserGuard } from '../../guards/acl-user.guard';

const routes: Routes = [
  { path: 'seller', component: SellerComponent,
    canActivate: [AclUserGuard], data: {roles: ['Reports', 'can_read', '']}},
  { path: 'buyer', component: BuyerComponent,
    canActivate: [AclUserGuard], data: {roles: ['Reports', 'can_read', '']}},
  { path: 'notary', component: NotaryComponent,
    canActivate: [AclUserGuard], data: {roles: ['Reports', 'can_read', '']}},
  { path: 'bank', component: BankComponent,
    canActivate: [AclUserGuard], data: {roles: ['Reports', 'can_read', '']}}
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
    NgxChartsModule,
    Ng2TelInputModule,
    CalendarModule
  ],
  declarations: [
    ReportsComponent,
    SellerComponent,
    BuyerComponent,
    NotaryComponent,
    BankComponent
  ]
})
export class ReportsModule { }
