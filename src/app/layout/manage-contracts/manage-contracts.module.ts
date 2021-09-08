import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditContractsComponent } from './add-edit-contracts/add-edit-contracts.component';
import { ManageContractsComponent } from './manage-contracts.component';
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgmCoreModule } from '@agm/core';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalendarModule } from 'primeng/primeng';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { TranslateModule } from '@ngx-translate/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SharedModule } from 'src/app/modules/shared.module'

const routes: Routes = [
  {
    path: 'view-all', component: ManageContractsComponent,
    canActivate: [AclUserGuard], data: { roles: ['Project Management', 'can_read', 'can_data_collector'] }
  },
  {
    path: 'add-contract', component: AddEditContractsComponent,
    canActivate: [AclUserGuard], data: { roles: ['Project Management', 'can_create', 'can_data_collector'] }
  },
  {
    path: 'edit-contract/:id', component: AddEditContractsComponent,
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
  declarations: [ManageContractsComponent, AddEditContractsComponent]
})
export class ManageContractsModule { }
