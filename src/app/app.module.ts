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
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// firebase -start
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
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
// import { TranslateService } from './lang/translate.service';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { ApiConstants } from './common/api-constants';
import { VersionCheckService } from './services/version-check.service';
import { Img360viewerComponent } from './layout/img360viewer/img360viewer.component';
import { PropertyService } from './services/property.service';
import { ProjectService } from './services/project.service';
import { LeadsService } from './services/leads.service';
import { ExcelService } from './services/excel.service';
import { DownloadAccountStatementComponent } from './layout/collections/download-account-statement/download-account-statement.component';
import { AclUserGuard } from './guards/acl-user.guard';
import { GenerateOfferPdfService } from './services/generate-offer-pdf.service';
import { DatePipe } from '@angular/common';
import { PricePipe } from './pipes/price.pipe';
import { CustomPricePipe } from './pipes/custom-price.pipe';
import { MaterialModule } from './material.module';
const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'img-36-viewer', component: Img360viewerComponent },
  {
    path: 'dashboard', canActivate: [AuthGuard],
    loadChildren: './layout/layout.module#LayoutModule'
  },
  {
    path: 'download-account-statement/:id/:lang', component: DownloadAccountStatementComponent
  },
  // { path: 'dashboard', canActivate: [AclUserGuard], data: {roles: ['Dashboard', 'can_read', '']},
  //  loadChildren: './layout/layout.module#LayoutModule'},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    LoginComponent,
    PageNotFoundComponent,
    DownloadAccountStatementComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: false, preloadingStrategy: PreloadAllModules }),
    // RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    SweetAlert2Module.forRoot({
      // confirmButtonClass: 'btn btn-primary',
      // cancelButtonClass: 'btn'
    }),
    MaterialModule,
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
    ToastrModule.forRoot({
      maxOpened: 1,
      preventDuplicates: true,
      autoDismiss: true
    }),
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AdminService,
    PropertyService,
    ProjectService,
    LeadsService,
    VersionCheckService,
    CommonService,
    AuthGuard,
    HttpInterceptor,
    Constant,
    ApiConstants,
    Login,
    AdminACL,
    // TranslateService,
    AngularFireMessaging,
    ExcelService,
    GenerateOfferPdfService,
    DatePipe,
    PricePipe,
    CustomPricePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
