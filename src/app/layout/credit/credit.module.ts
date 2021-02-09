import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRequestComponent } from './add-request/add-request.component';
import { RouterModule, Routes } from '@angular/router';
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { CreditComponent } from './credit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgmCoreModule } from '@agm/core';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalendarModule, DropdownModule } from 'primeng/primeng';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { UserBlockComponent } from '../common-blocks/user-block/user-block.component';
import { SharedModule } from 'src/app/modules/shared.module';
import { CreditAddEditComponent } from './credit-add-edit/credit-add-edit.component';

const routes: Routes = [
  {
    path: 'view-credit', component: CreditComponent,
    canActivate: [AclUserGuard], data: { roles: ['Manage Collections', 'can_read', ''] }
  },
  {
    path: 'add-request/:id', component: AddRequestComponent,
    canActivate: [AclUserGuard], data: { roles: ['Manage Collections', 'can_read', ''] }
  },
  {
    path: 'credit-add-edit/:id', component: CreditAddEditComponent,
    canActivate: [AclUserGuard], data: { roles: ['Manage Collections', 'can_read', ''] }
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
    })
  ],
  declarations: [
    AddRequestComponent,
    CreditComponent,
    UserBlockComponent,
    CreditAddEditComponent
  ]
})
export class CreditModule { }
