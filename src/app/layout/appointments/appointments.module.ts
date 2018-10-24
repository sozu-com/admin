import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AclUserGuard } from '../../guards/acl-user.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { AppointmentsComponent } from './appointments.component';

const routes: Routes = [
  // { path: '', component: AppointmentsComponent}
  { path: '', component: AppointmentsComponent,
    canActivate: [AclUserGuard], data: {roles: ['Appointments', 'can_read', '']}}
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
    ReactiveFormsModule
  ],
  declarations: [
    AppointmentsComponent
  ]
})

export class AppointmentsModule { }
