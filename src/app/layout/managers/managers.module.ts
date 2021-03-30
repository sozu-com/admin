// third party libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AgmCoreModule } from '@agm/core';

// general components
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { SharedModule } from 'src/app/modules/shared.module';
import { ManagersComponent } from './managers.component';
import { TranslateModule } from '@ngx-translate/core';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

const routes: Routes = [
  {
    path: 'view-all', component: ManagersComponent,
    canActivate: [AclUserGuard], data: { roles: ['Managers Management', 'can_read', ''] }
  },{
    path: 'view-all/:type/:name', component: ManagersComponent,
    canActivate: [AclUserGuard], data: { roles: ['Managers Management', 'can_read', ''] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    LazyLoadImageModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
      libraries: ['drawing', 'places']
    }),
    Ng2TelInputModule,
    SharedModule,
    TranslateModule,
    MalihuScrollbarModule.forRoot(),
  ],
  declarations: [
    ManagersComponent
  ]
})
export class ManagersModule { }
