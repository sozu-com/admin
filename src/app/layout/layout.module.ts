import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
// import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AgmCoreModule } from '@agm/core';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

// importing shared components
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { AppHeaderComponent } from '../shared/app-header/app-header.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { AppFooterComponent } from '../shared/app-footer/app-footer.component';

// importing general component
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { InhouseUsersComponent } from './inhouse-users/inhouse-users.component';
import { AddressComponent } from './inhouse-users/address/address.component';
import { AdminService } from '../services/admin.service';
import { CommonService } from '../services/common.service';
import { AuthGuard } from '../guards/auth.guard';
import { Constant } from '../common/constants';
import { HttpInterceptor } from './../services/http-interceptor';
import { GenerateThumbComponent } from './generate-thumb/generate-thumb.component';
import { AclPermissionDirective } from '../directives/acl-permission.directive';
import { AclUserGuard } from '../guards/acl-user.guard';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),      // modal
        NgxPaginationModule,
        // LoadingModule.forRoot({
        //     animationType: ANIMATION_TYPES.rectangleBounce,
        //     primaryColour: '#00B96F'
        // }),
        NgxMyDatePickerModule.forRoot(),
        MalihuScrollbarModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCYv_zELZGVo2Ehzgp8eh8UeSIidhMCmH8',
            libraries: ['drawing']
          }),
        Ng2TelInputModule,
        NgxChartsModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot()
    ],
    declarations: [
        LayoutComponent,
        AppHeaderComponent,
        DashboardComponent,
        ChangePasswordComponent,
        AppFooterComponent,
        InhouseUsersComponent,
        AddressComponent,
        GenerateThumbComponent,
        AclPermissionDirective
    ],
    providers: [
        AdminService,
        CommonService,
        AuthGuard,
        AclUserGuard,
        HttpInterceptor,
        Constant
    ],
    bootstrap: [LayoutComponent],
})
export class LayoutModule {}
