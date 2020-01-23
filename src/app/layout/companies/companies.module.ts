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
import { CompaniesComponent } from './companies.component';
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { AddCompanyComponent } from './add-company/add-company.component';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

const routes: Routes = [
  {
    path: '', component: CompaniesComponent,
    canActivate: [AclUserGuard], data: { roles: ['Companies Management', 'can_read', ''] }
  },
  {
    path: 'add-company/:id', component: AddCompanyComponent,
    canActivate: [AclUserGuard], data: { roles: ['Companies Management', 'can_read', ''] }
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
    CompaniesComponent,
    AddCompanyComponent
  ]
})
export class CompaniesModule { }
