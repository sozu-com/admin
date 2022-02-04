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
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// general components
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { SharedModule } from 'src/app/modules/shared.module';
import { DevelopersComponent } from './developers.component';
import { AddDeveloperComponent } from './add-developer/add-developer.component';

const routes: Routes = [
  {
    path: 'view-all', component: DevelopersComponent,
    canActivate: [AclUserGuard], data: { roles: ['Developers Management', 'can_read', ''] }
  }, {
    path: 'view-all/:name', component: DevelopersComponent,
    canActivate: [AclUserGuard], data: { roles: ['Developers Management', 'can_read', ''] }
  },
  {
    path: 'add-developer/:id', component: AddDeveloperComponent,
    canActivate: [AclUserGuard], data: { roles: ['Developers Management', 'can_read', ''] }
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
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [
    DevelopersComponent,
    AddDeveloperComponent
  ]
})

export class DevelopersModule { }
