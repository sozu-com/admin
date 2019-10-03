// third party libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';

// general componets
import { AclComponent } from './acl.component';
import { AddAclComponent } from './add-acl/add-acl.component';
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { ImgPipe } from 'src/app/pipes/img.pipe';
import { SharedModule } from 'src/app/modules/shared.module';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
  // { path: '', component: AclComponent, canActivate: [AclUserGuard]},
  // { path: 'add-acl-user/:id', component: AddAclComponent }
  { path: '', component: AclComponent, canActivate: [AclUserGuard], data: { roles: ['Access Controls', 'can_read', ''] } },
  {
    path: 'add-acl-user/:id', component: AddAclComponent,
    canActivate: [AclUserGuard], data: { roles: ['Access Controls', 'can_create', ''] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxSpinnerModule,
    LazyLoadImageModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    SharedModule,
    TranslateModule
  ],
  declarations: [
    AclComponent,
    AddAclComponent
  ]
})
export class AclModule { }
