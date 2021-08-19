import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { RouterModule, Routes } from '@angular/router';
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { ManageProductComponent } from './manage-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgmCoreModule } from '@agm/core';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalendarModule } from 'primeng/primeng';
import { SharedModule } from 'src/app/modules/shared.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { TranslateModule } from '@ngx-translate/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const routes: Routes = [
  {
    path: 'view-product', component: ManageProductComponent,
    canActivate: [AclUserGuard], data: { roles: ['Project Management', 'can_read', 'can_data_collector'] }
  },
  {
    path: 'add-product', component: AddEditProductComponent,
    canActivate: [AclUserGuard], data: { roles: ['Project Management', 'can_create', 'can_data_collector'] }
  },
  {
    path: 'edit-product/:id', component: AddEditProductComponent,
    canActivate: [AclUserGuard], data: { roles: ['Project Management', 'can_update', 'can_data_collector'] }
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
      apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
      libraries: ['drawing', 'places']
    }),
    Ng2TelInputModule,
    NgxPaginationModule,
    CalendarModule,
    SharedModule,
    LazyLoadImageModule,
    MalihuScrollbarModule.forRoot(),
    TranslateModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [
    ManageProductComponent,
    AddEditProductComponent]
})
export class ManageProductModule { }
