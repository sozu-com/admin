import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AdminService } from './services/admin.service';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './guards/auth.guard';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

// firebase -start
import { AngularFireModule} from '@angular/fire';
import { environment} from '../environments/environment';
import * as firebase from 'firebase';
firebase.initializeApp(environment.firebase);
// firebase -end

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LayoutModule } from './layout/layout.module';
import { HttpInterceptor } from './services/http-interceptor';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { CommonService } from './services/common.service';
import { Constant } from './common/constants';
import { Login, AdminACL } from './models/login.model';
import { SharedModule } from './modules/shared.module';
import { TranslateService } from './lang/translate.service';
import { NumberWithCommasPipe } from './pipes/number-with-commas.pipe';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { ApiConstants } from './common/api-constants';
import { VersionCheckService } from './services/version-check.service';
import { Img360viewerComponent } from './layout/img360viewer/img360viewer.component';
import { PricePipe } from './pipes/price.pipe';
import { PropertyService } from './services/property.service';
import { ProjectService } from './services/project.service';
import { LeadsService } from './services/leads.service';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent},
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'img-36-viewer', component: Img360viewerComponent},
  { path: 'dashboard', canActivate: [AuthGuard], loadChildren: './layout/layout.module#LayoutModule'},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    LoginComponent,
    PageNotFoundComponent,
    // PricePipe,
    // NumberWithCommasPipe,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}),
    SweetAlert2Module.forRoot({
      // confirmButtonClass: 'btn btn-primary',
      // cancelButtonClass: 'btn'
    }),
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    SharedModule,
    NgxSpinnerModule,
    MalihuScrollbarModule.forRoot(),
    Ng2TelInputModule,
    ToastrModule.forRoot(),
    // AngularFireDatabaseModule,
    // AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    AdminService,
    PropertyService,
    ProjectService,
    LeadsService,
    VersionCheckService,
    // AngularFireDatabase,
    // AngularFireAuth,
    // MessagingService,
    CommonService,
    AuthGuard,
    HttpInterceptor,
    Constant,
    ApiConstants,
    Login,
    AdminACL,
    TranslateService,
    AngularFireMessaging
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
