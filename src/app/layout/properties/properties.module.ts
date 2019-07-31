// third party libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgmCoreModule } from '@agm/core';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxPaginationModule } from 'ngx-pagination';
import { LazyLoadImageModule } from 'ng-lazyload-image';

// general components
import { PropertiesComponent } from './properties.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { AclUserGuard } from '../../guards/acl-user.guard';
import { FilterByIdPipe } from '../../pipes/filter-by-id.pipe';
import { FilterByNamePipe } from '../../pipes/filter-by-name.pipe';
import { SharedModule } from '../../modules/shared.module';
import { CalendarModule } from 'primeng/primeng';
import { ProjectBlockComponent } from '../common-blocks/project-block/project-block.component';
import { BulkAddComponent } from './bulk-add/bulk-add.component';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

const routes: Routes = [
  { path: 'details/:property_id', component: PropertyDetailsComponent },
  // { path: 'details/:property_id', component: PropertyDetailsComponent,
  //   canActivate: [AclUserGuard], data: {roles: ['Property Management', 'can_read', '']}},
  { path: 'add-bulk-property/:property_id/:seller_id', component: BulkAddComponent,
    canActivate: [AclUserGuard], data: {roles: ['Property Management', 'can_create', 'can_csr_seller']}},
  { path: 'add-property/:property_id/:seller_id', component: AddPropertyComponent,
    canActivate: [AclUserGuard], data: {roles: ['Property Management', 'can_create', 'can_csr_seller']}},
  { path: 'edit-property/:property_id', component: AddPropertyComponent,
    canActivate: [AclUserGuard], data: {roles: ['Property Management', 'can_update', 'can_csr_seller']}},
  { path: 'edit-property/:property_id/:edit', component: AddPropertyComponent,
    canActivate: [AclUserGuard], data: {roles: ['Property Management', 'can_update', 'can_csr_seller']}},
  { path: 'view-properties', component: PropertiesComponent,
    canActivate: [AclUserGuard], data: {roles: ['Property Management', 'can_read', '']}}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
        libraries: ['drawing', 'places']
      }),
    Ng2TelInputModule,
    NgxPaginationModule,
    CalendarModule,
    SharedModule,
    LazyLoadImageModule,
    MalihuScrollbarModule.forRoot()
  ],
  declarations: [
    PropertiesComponent,
    AddPropertyComponent,
    PropertyDetailsComponent,
    FilterByIdPipe,
    FilterByNamePipe,
    ProjectBlockComponent,
    BulkAddComponent
  ]
})

export class PropertiesModule { }
