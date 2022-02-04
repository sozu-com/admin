
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
import { NgOtpInputModule } from 'ng-otp-input';


// general components
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { SharedModule } from 'src/app/modules/shared.module';
import { LegalEntityComponent } from './legal-entity.component';
import { AddLegalEntityComponent } from './add-legal-entity/add-legal-entity.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
const routes: Routes = [
  {
    path: 'view-all', component: LegalEntityComponent,
    canActivate: [AclUserGuard], data: { roles: ['Manage Legal Entity', 'can_read', ''] }
  },
  {
    path: 'view-all/:legal_entity_id', component: LegalEntityComponent,
    canActivate: [AclUserGuard], data: { roles: ['Manage Legal Entity', 'can_read', ''] }
  },
  {
    path: 'view-all/:developer_name/:developer_id', component: LegalEntityComponent,
    canActivate: [AclUserGuard], data: { roles: ['Manage Legal Entity', 'can_read', ''] }
  },
  {
    path: 'add-legal-entity/:id', component: AddLegalEntityComponent,
    canActivate: [AclUserGuard], data: { roles: ['Manage Legal Entity', 'can_read', ''] }
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
      apiKey: 'AIzaSyCHX_-aQlnqaVaJyo3Prw54qX_ECT6wC6w',
      libraries: ['drawing', 'places']
    }),
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    SharedModule,
    TranslateModule,
    MalihuScrollbarModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    NgOtpInputModule
  ],
  declarations: [
    LegalEntityComponent,
    AddLegalEntityComponent,
    DocumentUploadComponent
  ]
})

export class LegalEntityModule { }
