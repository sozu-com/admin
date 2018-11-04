import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { AclComponent } from './acl.component';
import { AddAclComponent } from './add-acl/add-acl.component';
import { AclUserGuard } from '../../guards/acl-user.guard';
import { ImgPipe } from '../../pipes/img.pipe';
import { SharedModule } from '../../modules/shared.module';


const routes: Routes = [
  // { path: '', component: AclComponent, canActivate: [AclUserGuard]},
  // { path: 'add-acl-user/:id', component: AddAclComponent }
  { path: '', component: AclComponent, canActivate: [AclUserGuard], data: {roles: ['Access Controls', 'can_read', '']} },
  { path: 'add-acl-user/:id', component: AddAclComponent,
    canActivate: [AclUserGuard], data: {roles: ['Access Controls', 'can_create', '']} }
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
    SharedModule
  ],
  declarations: [
    AclComponent,
    AddAclComponent
  ]
})
export class AclModule { }
