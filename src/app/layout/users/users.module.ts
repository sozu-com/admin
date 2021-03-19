// third party libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { AgmCoreModule } from '@agm/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TranslateModule } from '@ngx-translate/core';

// importing components
import { UsersComponent } from './users.component';
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { SharedModule } from 'src/app/modules/shared.module';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CalendarModule } from 'primeng/primeng';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DocumentsUploadComponent } from './documents-upload/documents-upload.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent,
    canActivate: [AclUserGuard], data: { roles: ['User Management', 'can_read', ''] }
  },
  {
    path: 'edit-user/:id', component: EditUserComponent,
    canActivate: [AclUserGuard], data: { roles: ['User Management', 'can_read', ''] }
  },
  {
    path: 'add-user', component: AddUserComponent,
    canActivate: [AclUserGuard], data: { roles: ['User Management', 'can_read', ''] }
  },
  {
    path: 'documents-upload/:id/:documentType', component: DocumentsUploadComponent,
    canActivate: [AclUserGuard], data: { roles: ['User Management', 'can_read', ''] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxSpinnerModule,
    LazyLoadImageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
      libraries: ['drawing', 'places']
    }),
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    SharedModule,
    CalendarModule,
    TranslateModule,
    MalihuScrollbarModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    DocumentsUploadComponent
  ]
})

export class UsersModule { }
