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
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

// general components
import { AclUserGuard } from '../../guards/acl-user.guard';
import { SharedModule } from '../../modules/shared.module';
import { AgenciesComponent } from './agencies.component';
import { AddAgencyComponent } from './add-agency/add-agency.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: 'view-all', component: AgenciesComponent,
    canActivate: [AclUserGuard], data: { roles: ['Agencies Management', 'can_read', ''] }
  },
  {
    path: 'view-all/:name', component: AgenciesComponent,
    canActivate: [AclUserGuard], data: { roles: ['Agencies Management', 'can_read', ''] }
  },
  {
    path: 'add-agency/:id', component: AddAgencyComponent,
    canActivate: [AclUserGuard], data: { roles: ['Agencies Management', 'can_read', ''] }
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
    LazyLoadImageModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    MalihuScrollbarModule.forRoot(),
    SharedModule,
    TranslateModule
  ],
  declarations: [
    AgenciesComponent,
    AddAgencyComponent
  ]
})

export class AgenciesModule { }
