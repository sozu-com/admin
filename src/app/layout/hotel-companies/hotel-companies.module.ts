import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// third party libraries
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { AgmCoreModule } from '@agm/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TranslateModule } from '@ngx-translate/core';

// general components
import { SharedModule } from 'src/app/modules/shared.module';
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { HotelCompaniesComponent } from './hotel-companies.component';
import { AddHotelCompanyComponent } from './add-hotel-company/add-hotel-company.component';

const routes: Routes = [
  {
    path: 'view-all', component: HotelCompaniesComponent,
    canActivate: [AclUserGuard], data: { roles: ['Hotel Companies Management', 'can_read', ''] }
  }, {
    path: 'add-hotel-company/:id', component: AddHotelCompanyComponent,
    canActivate: [AclUserGuard], data: { roles: ['Hotel Companies Management', 'can_read', ''] }
  }, {
    path: 'view-all/:type/:name', component: HotelCompaniesComponent,
    canActivate: [AclUserGuard], data: { roles: ['Hotel Companies Management', 'can_read', ''] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
      libraries: ['drawing', 'places']
    }),
    NgxPaginationModule,
    LazyLoadImageModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    SharedModule,
    TranslateModule,
    MalihuScrollbarModule.forRoot(),
  ],
  declarations: [
    HotelCompaniesComponent,
    AddHotelCompanyComponent
  ]
})
export class HotelCompaniesModule { }
