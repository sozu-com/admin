import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxPaginationModule } from 'ngx-pagination';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { NouisliderModule } from 'ng2-nouislider';
import { RemoveCommaPipe } from './../../pipes/remove-comma.pipe';
import { LeadsComponent } from './leads.component';
import { DataCollectorComponent } from './data-collector/data-collector.component';
import { CsrSellerComponent } from './csr-seller/csr-seller.component';
import { CsrBuyerComponent } from './csr-buyer/csr-buyer.component';
import { InhouseBrokerComponent } from './inhouse-broker/inhouse-broker.component';
import { CsrCloserComponent } from './csr-closer/csr-closer.component';
import { CsrBuyerDetailComponent } from './csr-buyer/csr-buyer-detail/csr-buyer-detail.component';
import { InhouseBrokerDetailComponent } from './inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component';
import { CsrCloserDetailComponent } from './csr-closer/csr-closer-detail/csr-closer-detail.component';
import { InterestedPropertyComponent } from './../common-blocks/interested-property/interested-property.component';
import { ViewedPropertyComponent } from './../common-blocks/viewed-property/viewed-property.component';
import { FillInformationComponent } from './../common-blocks/fill-information/fill-information.component';
import { MyChatComponent } from './inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component';
import { AclUserGuard } from '../../guards/acl-user.guard';
import { SharedModule } from '../../modules/shared.module';
import { CsrSellerDetailComponent } from './csr-seller/csr-seller-detail/csr-seller-detail.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ViewedProjectsComponent } from '../common-blocks/viewed-projects/viewed-projects.component';
import { CalendarModule } from 'primeng/primeng';
import { SellerChatComponent } from './csr-seller/csr-seller-detail/seller-chat/seller-chat.component';
import { OutsideBrokerComponent } from './outside-broker/outside-broker.component';
import { OutsideBrokerDetailComponent } from './outside-broker/outside-broker-detail/outside-broker-detail.component';

const routes: Routes = [
  {
    path: 'data-collectors', component: DataCollectorComponent,
    canActivate: [AclUserGuard], data: { roles: ['Data Collector Lead Management', 'can_read', 'can_data_collector'] }
  },

  {
    path: 'csr-sellers', component: CsrSellerComponent,
    canActivate: [AclUserGuard], data: { roles: ['Seller Lead Management', 'can_read', 'can_csr_seller'] }
  },
  // lead wrt seller
  {
    path: 'csr-sellers-leads/:id', component: CsrSellerComponent,
    canActivate: [AclUserGuard], data: { roles: ['Seller Lead Management', 'can_read', 'can_csr_seller'] }
  },
  // lead details
  {
    path: 'csr-sellers/:id', component: CsrSellerDetailComponent,
    canActivate: [AclUserGuard], data: { roles: ['Seller Lead Management', 'can_read', 'can_csr_seller'] }
  },
  {
    path: 'chat-with-seller/:chat_with/:id/:user_id', component: SellerChatComponent,
    canActivate: [AclUserGuard], data: { roles: ['Seller Lead Management', 'can_read', 'can_csr_seller'] }
  },

  {
    path: 'csr-buyers', component: CsrBuyerComponent,
    canActivate: [AclUserGuard], data: { roles: ['Buyer Lead Management', 'can_read', 'can_csr_buyer'] }
  },
  // lead wrt buyer
  {
    path: 'csr-buyers-leads/:id', component: CsrBuyerComponent,
    canActivate: [AclUserGuard], data: { roles: ['Buyer Lead Management', 'can_read', 'can_csr_buyer'] }
  },
  // lead details
  {
    path: 'csr-buyers/:id', component: CsrBuyerDetailComponent,
    canActivate: [AclUserGuard], data: { roles: ['Buyer Lead Management', 'can_read', 'can_csr_buyer'] }
  },

  {
    path: 'inhouse-broker', component: InhouseBrokerComponent,
    canActivate: [AclUserGuard], data: { roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker'] }
  },
  // leads wrt inhouse broker
  {
    path: 'inhouse-broker-leads/:id', component: InhouseBrokerComponent,
    canActivate: [AclUserGuard], data: { roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker'] }
  },
  // lead details
  {
    path: 'inhouse-broker/:id', component: InhouseBrokerDetailComponent,
    canActivate: [AclUserGuard], data: { roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker'] }
  },
  {
    path: 'chat-list/:type/:id', component: MyChatComponent,
    canActivate: [AclUserGuard], data: { roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker'] }
  },
  // {
  //   path: 'chat-with-csr-seller/:type/:id', component: MyChatComponent,
  //   canActivate: [AclUserGuard], data: { roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker'] }
  // },
  {
    path: 'outside-broker', component: OutsideBrokerComponent,
    canActivate: [AclUserGuard], data: { roles: ['Outside Broker Lead Management', 'can_read', 'can_in_house_broker'] }
  },
  // leads wrt inhouse broker
  {
    path: 'outside-broker-leads/:id', component: OutsideBrokerComponent,
    canActivate: [AclUserGuard], data: { roles: ['Outside Broker Lead Management', 'can_read', 'can_in_house_broker'] }
  },
  // lead details
  {
    path: 'outside-broker/:id', component: OutsideBrokerDetailComponent,
    canActivate: [AclUserGuard], data: { roles: ['Outside Broker Lead Management', 'can_read', 'can_in_house_broker'] }
  },

  {
    path: 'csr-closers', component: CsrCloserComponent,
    canActivate: [AclUserGuard], data: { roles: ['Closer Lead Management', 'can_read', 'can_csr_closer'] }
  },
  // leads wrt closure
  {
    path: 'csr-closers-leads/:id', component: CsrCloserComponent,
    canActivate: [AclUserGuard], data: { roles: ['Closer Lead Management', 'can_read', 'can_csr_closer'] }
  },
  // lead details
  {
    path: 'csr-closers/:id', component: CsrCloserDetailComponent,
    canActivate: [AclUserGuard], data: { roles: ['Closer Lead Management', 'can_read', 'can_csr_closer'] }
  }
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
    NouisliderModule,
    NgxChartsModule,
    SharedModule,
    CalendarModule
    // LayoutModule
    // NgBoxModule
  ],
  declarations: [
    LeadsComponent,
    DataCollectorComponent,
    CsrSellerComponent,
    CsrSellerDetailComponent,
    CsrBuyerComponent,
    InhouseBrokerComponent,
    CsrCloserComponent,
    CsrBuyerDetailComponent,
    InhouseBrokerDetailComponent,
    CsrCloserDetailComponent,
    InterestedPropertyComponent,
    ViewedPropertyComponent,
    ViewedProjectsComponent,
    RemoveCommaPipe,
    FillInformationComponent,
    MyChatComponent,
    SellerChatComponent,
    OutsideBrokerComponent,
    OutsideBrokerDetailComponent
  ],
  // providers: [NgBoxService]
})

export class LeadsModule { }
