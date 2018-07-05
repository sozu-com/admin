import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlertService } from 'ngx-sweetalert2';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { NgBoxModule } from 'ngbox/ngbox.module';
import { NgBoxService } from 'ngbox/ngbox.service';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';

// importing shared components
import { LoginComponent } from './login/login.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { AppHeaderComponent } from '../shared/app-header/app-header.component';
import { AppSidebarComponent} from '../shared/app-sidebar/app-sidebar.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { AppFooterComponent } from '../shared/app-footer/app-footer.component';
import { SessionModalComponent } from '../shared/session-modal/session-modal.component';

// importing general component
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { LocationComponent } from './settings/location/location.component';
import { PropertyComponent } from './settings/property/property.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        FormsModule, 
        ReactiveFormsModule,
        NgbModule.forRoot(),
        ModalModule.forRoot(),      // modal
        NgxPaginationModule,
        LoadingModule.forRoot({
            animationType: ANIMATION_TYPES.rectangleBounce,
            backdropBackgroundColour: 'rgba(0,0,0,0.7)', 
            backdropBorderRadius: '4px',
            primaryColour: '#ec4758'
        }),
        MomentModule,
        NgBoxModule,
        NgxMyDatePickerModule.forRoot(),
        MalihuScrollbarModule.forRoot()
    ],
    declarations: [
        LayoutComponent,
        AppHeaderComponent,
        AppSidebarComponent,
        LoginComponent,
        DashboardComponent,
        ChangePasswordComponent,
        AppFooterComponent,
        SessionModalComponent,
        LocationComponent,
        PropertyComponent
    ],
    providers: [SweetAlertService, NgBoxService],
})
export class LayoutModule { }
