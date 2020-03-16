// third party libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AgmCoreModule } from '@agm/core';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { CalendarModule } from 'primeng/primeng';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

// importing shared components
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { AppHeaderComponent } from '../shared/app-header/app-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppFooterComponent } from '../shared/app-footer/app-footer.component';

// importing general component
import { InhouseUsersComponent } from './inhouse-users/inhouse-users.component';
import { AddressComponent } from './inhouse-users/address/address.component';
import { AuthGuard } from '../guards/auth.guard';
import { GenerateThumbComponent } from './generate-thumb/generate-thumb.component';
import { AclPermissionDirective } from '../directives/acl-permission.directive';
import { AclUserGuard } from '../guards/acl-user.guard';
import { MessagingService } from '../fire-base/messaging.service';
import { SharedModule } from '../modules/shared.module';
import { Img360viewerComponent } from './img360viewer/img360viewer.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    NgxSpinnerModule,
    NgxMyDatePickerModule.forRoot(),
    MalihuScrollbarModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
      libraries: ['drawing', 'places']
    }),
    Ng2TelInputModule,
    NgxChartsModule,
    SharedModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    CalendarModule,
    LazyLoadImageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  declarations: [
    LayoutComponent,
    AppHeaderComponent,
    DashboardComponent,
    AppFooterComponent,
    InhouseUsersComponent,
    AddressComponent,
    GenerateThumbComponent,
    AclPermissionDirective,
    Img360viewerComponent
  ],
  providers: [MessagingService, AuthGuard, AclUserGuard],
  bootstrap: [LayoutComponent]
})
export class LayoutModule {}
