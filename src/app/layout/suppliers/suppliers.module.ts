
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
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// general components
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { SharedModule } from 'src/app/modules/shared.module';
import { SuppliersComponent } from './suppliers.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
const routes: Routes = [
  {
    path: 'view-all', component: SuppliersComponent,
    canActivate: [AclUserGuard], data: { roles: ['Manage Suppliers', 'can_read', ''] }
  },
  {
    path: 'view-all/:supplier', component: SuppliersComponent,
    canActivate: [AclUserGuard], data: { roles: ['Manage Suppliers', 'can_read', ''] }
  },
  {
    path: 'add-supplier/:id', component: AddSupplierComponent,
    canActivate: [AclUserGuard], data: { roles: ['Manage Suppliers', 'can_read', ''] }
  },
  {
    path: 'document-upload/:id', component: DocumentUploadComponent,
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
    TranslateModule,
    MalihuScrollbarModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [
    SuppliersComponent,
    AddSupplierComponent,
    DocumentUploadComponent,
    // AddLegalEntityComponent,
    // DocumentUploadComponent
  ]
})

export class SuppliersModule { }
