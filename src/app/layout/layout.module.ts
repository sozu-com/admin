import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { NgxPaginationModule } from 'ngx-pagination';
import { SweetAlertService } from 'ngx-sweetalert2';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { NgBoxModule } from 'ngbox/ngbox.module';
import { NgBoxService } from 'ngbox/ngbox.service';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AgmCoreModule } from '@agm/core';
import { Ng2TelInputModule } from 'ng2-tel-input';

// importing shared components
// import { LoginComponent } from './login/login.component';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { AppHeaderComponent } from '../shared/app-header/app-header.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { AppFooterComponent } from '../shared/app-footer/app-footer.component';

// importing general component
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { InhouseUsersComponent } from './inhouse-users/inhouse-users.component';
import { AddressComponent } from './inhouse-users/address/address.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),      // modal
        NgxPaginationModule,
        LoadingModule.forRoot({
            animationType: ANIMATION_TYPES.rectangleBounce,
            primaryColour: '#00B96F'
        }),
        MomentModule,
        NgBoxModule,
        NgxMyDatePickerModule.forRoot(),
        MalihuScrollbarModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCYv_zELZGVo2Ehzgp8eh8UeSIidhMCmH8',
            libraries: ['drawing']
          }),
        Ng2TelInputModule
    ],
    declarations: [
        LayoutComponent,
        AppHeaderComponent,
        // LoginComponent,
        // ForgotPasswordComponent,
        DashboardComponent,
        ChangePasswordComponent,
        AppFooterComponent,
        InhouseUsersComponent,
        AddressComponent
    ],
    providers: [SweetAlertService, NgBoxService],
})
export class LayoutModule { }
