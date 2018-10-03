import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxPaginationModule } from 'ngx-pagination';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
// import { NgBoxModule } from 'ngbox/ngbox.module';
// import { NgBoxService } from 'ngbox/ngbox.service';
import { NouisliderModule } from 'ng2-nouislider';
import { RemoveCommaPipe } from './../../pipes/remove-comma.pipe';
import { MomentPipe } from './../../pipes/moment.pipe';
import { ChatTimePipe } from './../../pipes/chat-time.pipe';
import { LeadsComponent } from './leads.component';
import { DataCollectorComponent } from './data-collector/data-collector.component';
import { CsrSellerComponent } from './csr-seller/csr-seller.component';
import { CsrBuyerComponent } from './csr-buyer/csr-buyer.component';
import { InhouseBrokerComponent } from './inhouse-broker/inhouse-broker.component';
import { CsrCloserComponent } from './csr-closer/csr-closer.component';
import { CsrBuyerDetailComponent } from './csr-buyer/csr-buyer-detail/csr-buyer-detail.component';
import { InhouseBrokerDetailComponent } from './inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component';
import { CsrCloserDetailComponent } from './csr-closer/csr-closer-detail/csr-closer-detail.component';
import { ChatComponent } from './../common-blocks/chat/chat.component';
import { InterestedPropertyComponent } from './../common-blocks/interested-property/interested-property.component';
import { ViewedPropertyComponent } from './../common-blocks/viewed-property/viewed-property.component';
import { NotesComponent } from './../common-blocks/notes/notes.component';
import { FillInformationComponent } from './../common-blocks/fill-information/fill-information.component';
import { ThousandPipe } from '../../pipes/thousand.pipe';
import { MyChatComponent } from './inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component';
import { AclUserGuard } from '../../guards/acl-user.guard';
import { LayoutModule } from '../layout.module';
import { SharedModule } from '../../modules/shared.module';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  { path: 'data-collectors', component: DataCollectorComponent,
    canActivate: [AclUserGuard], data: {roles: ['Data Collector Lead Management', 'can_read', 'can_data_collector']}},
  { path: 'csr-sellers', component: CsrSellerComponent,
    canActivate: [AclUserGuard], data: {roles: ['Seller Lead Management', 'can_read', 'can_csr_seller']}},
  { path: 'csr-buyers', component: CsrBuyerComponent,
    canActivate: [AclUserGuard], data: {roles: ['Buyer Lead Management', 'can_read', 'can_csr_buyer']}},
  { path: 'csr-buyers/:id', component: CsrBuyerDetailComponent,
    canActivate: [AclUserGuard], data: {roles: ['Buyer Lead Management', 'can_read', 'can_csr_buyer']}},
  { path: 'inhouse-broker', component: InhouseBrokerComponent,
    canActivate: [AclUserGuard], data: {roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker']}},
  { path: 'inhouse-broker/:id', component: InhouseBrokerDetailComponent,
    canActivate: [AclUserGuard], data: {roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker']}},
  { path: 'chat-with-developer/:id', component: MyChatComponent,
    canActivate: [AclUserGuard], data: {roles: ['Broker Lead Management', 'can_update', 'can_in_house_broker']}},
  { path: 'csr-closers', component: CsrCloserComponent,
    canActivate: [AclUserGuard], data: {roles: ['Closer Lead Management', 'can_read', 'can_csr_closer']}},
  { path: 'csr-closers/:id', component: CsrCloserDetailComponent,
    canActivate: [AclUserGuard], data: {roles: ['Closer Lead Management', 'can_read', 'can_csr_closer']}}
];


// const routes: Routes = [
//   { path: 'data-collectors', component: DataCollectorComponent,
//     canActivate: [AuthGuard], data: {roles: ['Data Collector Lead Management', 'can_read', 'can_data_collector']}},
//   { path: 'csr-sellers', component: CsrSellerComponent,
//     canActivate: [AuthGuard], data: {roles: ['Seller Lead Management', 'can_read', 'can_csr_seller']}},
//   { path: 'csr-buyers', component: CsrBuyerComponent,
//     canActivate: [AuthGuard], data: {roles: ['Buyer Lead Management', 'can_read', 'can_csr_buyer']}},
//   { path: 'csr-buyers/:id', component: CsrBuyerDetailComponent,
//     canActivate: [AuthGuard], data: {roles: ['Buyer Lead Management', 'can_read', 'can_csr_buyer']}},
//   { path: 'inhouse-broker', component: InhouseBrokerComponent,
//     canActivate: [AuthGuard], data: {roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker']}},
//   { path: 'inhouse-broker/:id', component: InhouseBrokerDetailComponent,
//     canActivate: [AuthGuard], data: {roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker']}},
//   { path: 'chat-with-developer/:id', component: MyChatComponent,
//     canActivate: [AuthGuard], data: {roles: ['Broker Lead Management', 'can_update', 'can_in_house_broker']}},
//   { path: 'csr-closers', component: CsrCloserComponent,
//     canActivate: [AuthGuard], data: {roles: ['Closer Lead Management', 'can_read', 'can_csr_closer']}},
//   { path: 'csr-closers/:id', component: CsrCloserDetailComponent,
//     canActivate: [AuthGuard], data: {roles: ['Closer Lead Management', 'can_read', 'can_csr_closer']}}
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
    MalihuScrollbarModule.forRoot(),
    NouisliderModule,
    SharedModule
    // LayoutModule
    // NgBoxModule
  ],
  declarations: [
    LeadsComponent,
    DataCollectorComponent,
    CsrSellerComponent,
    CsrBuyerComponent,
    InhouseBrokerComponent,
    CsrCloserComponent,
    CsrBuyerDetailComponent,
    InhouseBrokerDetailComponent,
    CsrCloserDetailComponent,
    // ChatComponent,
    InterestedPropertyComponent,
    ViewedPropertyComponent,
    RemoveCommaPipe,
    ThousandPipe,
    // MomentPipe,
    // ChatTimePipe,
    // NotesComponent,
    FillInformationComponent,
    MyChatComponent
  ],
  // providers: [NgBoxService]
})

export class LeadsModule { }
