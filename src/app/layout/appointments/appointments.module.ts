import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AclUserGuard } from '../../guards/acl-user.guard';
import { AppointmentsComponent } from './appointments.component';

const routes: Routes = [
  { path: '', component: AppointmentsComponent,
    canActivate: [AclUserGuard], data: {roles: ['Appointments', 'can_read', '']}}
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
    ReactiveFormsModule
  ],
  declarations: [
    AppointmentsComponent
  ]
})

export class AppointmentsModule { }
