// third party libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// general components
import { AclUserGuard } from '../../guards/acl-user.guard';
import { AppointmentsComponent } from './appointments.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '', component: AppointmentsComponent,
    canActivate: [AclUserGuard], data: { roles: ['Appointments', 'can_read', ''] }
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
    TranslateModule
  ],
  declarations: [
    AppointmentsComponent
  ]
})

export class AppointmentsModule { }
