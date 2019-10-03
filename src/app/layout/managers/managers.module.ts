// third party libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { LazyLoadImageModule } from 'ng-lazyload-image';

// general components
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { SharedModule } from 'src/app/modules/shared.module';
import { ManagersComponent } from './managers.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '', component: ManagersComponent,
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
    Ng2TelInputModule,
    SharedModule,
    TranslateModule
  ],
  declarations: [
    ManagersComponent
  ]
})
export class ManagersModule { }
