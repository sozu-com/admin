import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { AgmCoreModule } from '@agm/core';


import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { ImgPipe } from 'src/app/pipes/img.pipe';
import { SharedModule } from 'src/app/modules/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ManageRolesComponent } from './manage-roles.component';
import { AddEditRolesComponent } from './add-edit-roles/add-edit-roles.component';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxMaskModule } from 'ngx-mask';

const routes: Routes = [
  {
    path: 'manage-roles', component: ManageRolesComponent,
    canActivate: [AclUserGuard], data: { roles: ['Manage Roles', 'can_create', ''] }
  },
  {
    path: 'add-roles/:id', component: AddEditRolesComponent,
    canActivate: [AclUserGuard], data: { roles: ['Manage Roles', 'can_create', ''] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCHX_-aQlnqaVaJyo3Prw54qX_ECT6wC6w',
      libraries: ['drawing', 'places']
    }),
    Ng2TelInputModule,
    NgxPaginationModule,
    SharedModule,
    LazyLoadImageModule,
    MalihuScrollbarModule.forRoot(),
    TranslateModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  declarations: [
    ManageRolesComponent,
    AddEditRolesComponent
    //NumberexPipe
  ]
})
export class ManageRolesModule { }
