import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';

import { NotaryLeadsComponent } from './notary-leads/notary-leads.component';
import { NotaryComponent } from './notary.component';
import { NotaryLeadsDetailsComponent } from './notary-leads/notary-leads-details/notary-leads-details.component';

const routes: Routes = [
  { path: 'view-notary', component: NotaryComponent },
  { path: 'notary-leads', component: NotaryLeadsComponent },
  { path: 'notary-leads/notary-lead-details', component: NotaryLeadsDetailsComponent },
  // { path: '', component: NotaryComponent,
  //   children: [
  //     { path: 'view-notary', component: NotaryComponent },
  //     { path: 'notary-leads', component: NotaryComponent },
  //     { path: 'notary-leads/notary-lead-details', component: NotaryLeadsDetailsComponent }
  //   ]
  // },
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
    NotaryComponent,
    NotaryLeadsComponent,
    NotaryLeadsDetailsComponent
  ]
})

export class NotaryModule { }
