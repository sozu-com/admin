// third party libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';

import { UsersComponent } from './users.component';
import { AclUserGuard } from '../../guards/acl-user.guard';
import { SharedModule } from '../../modules/shared.module';

const routes: Routes = [
  { path: '', component: UsersComponent,
    canActivate: [AclUserGuard], data: {roles: ['User Management', 'can_read', '']}}
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
    Ng2TelInputModule,
    SharedModule
  ],
  declarations: [
    UsersComponent
  ]
})

export class UsersModule { }
