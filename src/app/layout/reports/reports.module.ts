import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { ReportsComponent } from './reports.component';
import { SellerComponent } from './seller/seller.component';
import { BuyerComponent } from './buyer/buyer.component';
import { NotaryComponent } from './notary/notary.component';
import { BankComponent } from './bank/bank.component';

const routes: Routes = [
  { path: 'seller', component: SellerComponent },
  { path: 'buyer', component: BuyerComponent },
  { path: 'notary', component: NotaryComponent },
  { path: 'bank', component: BankComponent }
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
    Ng2TelInputModule
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
