
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
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';

// general components
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { SharedModule } from 'src/app/modules/shared.module';
import { CalendarModule, DropdownModule } from 'primeng/primeng';
// import { DropdownModule } from 'primeng/dropdown';
import { AddEditCollectionComponent } from './add-edit-collection/add-edit-collection.component';
import { CollectionsComponent } from './collections.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { QuickVisualizationComponent } from './quick-visualization/quick-visualization.component';
import { AccountStatementComponent } from './account-statement/account-statement.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DownloadAccountStatementComponent } from './download-account-statement/download-account-statement.component';

const routes: Routes = [
  // {
  //   path: 'view-collections', component: CollectionsComponent,
  //   canActivate: [AclUserGuard], data: { roles: ['Property Management', 'can_read', ''] }
  // }
  {
    path: 'view-collections', component: CollectionsComponent,
    canActivate: [AclUserGuard], data: { roles: ['Manage Collections', 'can_read', ''] }
  },
  {
    path: 'view-collections/:id', component: CollectionsComponent,
    canActivate: [AclUserGuard], data: { roles: ['Manage Collections', 'can_read', ''] }
  },
  {
    path: 'add-collection/:id', component: AddEditCollectionComponent,
    canActivate: [AclUserGuard], data: { roles: ['Manage Collections', 'can_create', ''] }
  },
  {
    path: 'edit-collection/:id', component: AddEditCollectionComponent,
    canActivate: [AclUserGuard], data: { roles: ['Manage Collections', 'can_update', ''] }
  },
  {
    path: 'quick-visualization/:id', component: QuickVisualizationComponent,
    canActivate: [AclUserGuard], data: { roles: ['Manage Collections', 'can_read', ''] }
  },
  {
    path: 'account-statement/:id', component: AccountStatementComponent,
    canActivate: [AclUserGuard], data: { roles: ['Manage Collections', 'can_read', ''] }
  },
  {
    path: 'download-account-statement', component: DownloadAccountStatementComponent,
    canActivate: [AclUserGuard], data: { roles: ['Manage Collections', 'can_read', ''] }
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
    DropdownModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      preventDuplicates: true,
      autoDismiss: true
    }),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [
    CollectionsComponent,
    AddEditCollectionComponent,
    AnalyticsComponent,
    QuickVisualizationComponent,
    AccountStatementComponent,
    DownloadAccountStatementComponent
  ]
})

export class CollectionsModule { }

