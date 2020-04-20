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
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// general components
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { SharedModule } from 'src/app/modules/shared.module';
import { CalendarModule, DropdownModule } from 'primeng/primeng';
import { GeneralComponent } from './general/general.component';
import { ModelComponent } from './model/model.component';
import { ConceptComponent } from './concept/concept.component';
import { MonthlyComponent } from './monthly/monthly.component';
import { CollectionReportComponent } from './collection-report.component';
import { SalesTrendComponent } from './sales-trend/sales-trend.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { SalesBookingComponent } from './sales-booking/sales-booking.component';
import { CommissionIncomeComponent } from './commission-income/commission-income.component';
import { AppUnapprovedComponent } from './app-unapproved/app-unapproved.component';

const routes: Routes = [
  // {
  //   path: 'view-collections', component: CollectionsComponent,
  //   canActivate: [AclUserGuard], data: { roles: ['Property Management', 'can_read', ''] }
  // }
  {
    path: 'general-report', component: GeneralComponent
  },
  {
    path: 'monthly-report', component: MonthlyComponent
  },
  {
    path: 'model-report', component: ModelComponent
  },
  {
    path: 'concept-report', component: ConceptComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    CalendarModule,
    SharedModule,
    TranslateModule,
    DropdownModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [CollectionReportComponent, GeneralComponent, ModelComponent, ConceptComponent, MonthlyComponent, SalesTrendComponent, SalesReportComponent, SalesBookingComponent, CommissionIncomeComponent, AppUnapprovedComponent]
})

export class CollectionReportModule { }

