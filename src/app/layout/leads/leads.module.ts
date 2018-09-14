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

const routes: Routes = [
  { path: 'data-collectors', component: DataCollectorComponent },
  { path: 'csr-sellers', component: CsrSellerComponent },
  { path: 'csr-buyers', component: CsrBuyerComponent },
  { path: 'csr-buyers/:id', component: CsrBuyerDetailComponent },
  { path: 'inhouse-broker', component: InhouseBrokerComponent },
  { path: 'inhouse-broker/:id', component: InhouseBrokerDetailComponent },
  { path: 'csr-closers', component: CsrCloserComponent },
  { path: 'csr-closers/:id', component: CsrCloserDetailComponent }
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
    MalihuScrollbarModule.forRoot(),
    NouisliderModule
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
    ChatComponent,
    InterestedPropertyComponent,
    ViewedPropertyComponent,
    RemoveCommaPipe,
    ThousandPipe,
    MomentPipe,
    ChatTimePipe,
    NotesComponent,
    FillInformationComponent
  ],
  // providers: [NgBoxService]
})

export class LeadsModule { }
