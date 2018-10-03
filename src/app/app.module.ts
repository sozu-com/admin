import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminService } from './services/admin.service';
import { HttpModule, Http, RequestOptions, XHRBackend } from '@angular/http';
import { AuthGuard } from './guards/auth.guard';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { LayoutModule } from './layout/layout.module';
import { HttpInterceptor } from './services/http-interceptor';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { CommonService } from './services/common.service';
import { Constant } from './common/constants';
import { AclPermissionDirective } from './directives/acl-permission.directive';
import { Login, AdminACL } from './models/login.model';
import { SharedModule } from './modules/shared.module';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent},
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', canActivate: [AuthGuard], loadChildren: './layout/layout.module#LayoutModule'},
  { path: '**', component: PageNotFoundComponent },
];

// const appRoutes: Routes = [
//   { path: '', pathMatch: 'full', component: LoginComponent},
//   { path: 'login', pathMatch: 'full', component: LoginComponent },
//   { path: 'forgot-password', component: ForgotPasswordComponent },
//   { path: 'dashboard', canActivate: [AuthGuard], data: {roles: ['', '', '']}, loadChildren: './layout/layout.module#LayoutModule'},
//   { path: '**', component: PageNotFoundComponent },
// ];

@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    LoginComponent,
    PageNotFoundComponent,
    // AclPermissionDirective,
    // AclPermissionComponent,
    // RemoveCommaPipe,
    // MomentPipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    SweetAlert2Module.forRoot(),
    BrowserModule,
    HttpModule,
    FormsModule,
    LayoutModule,
    SharedModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.rectangleBounce,
      primaryColour: '#00B96F'
    }),
    MalihuScrollbarModule.forRoot(),
    Ng2TelInputModule
  ],
  providers: [AdminService, CommonService, AuthGuard, HttpInterceptor, Constant, Login, AdminACL
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
