import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';

import { UsersComponent } from './users.component';
import { AclUserGuard } from '../../guards/acl-user.guard';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  { path: '', component: UsersComponent,
    canActivate: [AclUserGuard], data: {roles: ['User Management', 'can_read', '']}}
  // { path: 'view-users', component: UsersComponent }
];

// const routes: Routes = [
//   { path: '', component: UsersComponent,
//     canActivate: [AuthGuard], data: {roles: ['User Management', 'can_read', '']}}
//   // { path: 'view-users', component: UsersComponent }
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
    Ng2TelInputModule
  ],
  declarations: [
    UsersComponent
  ]
})

export class UsersModule { }
