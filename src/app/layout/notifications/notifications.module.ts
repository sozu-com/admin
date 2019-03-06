import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AclUserGuard } from '../../guards/acl-user.guard';
import { SharedModule } from '../../modules/shared.module';
import { NotificationsComponent } from './notifications.component';

const routes: Routes = [
  { path: '', component: NotificationsComponent }
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
    SharedModule
  ],
  declarations: [
    NotificationsComponent
  ]
})

export class NotificationsModule { }
