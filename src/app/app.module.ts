import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminService } from './services/admin.service';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './services/auth.guard';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
// import { SignupComponent } from './signup/signup.component';
import { LayoutModule } from './layout/layout.module';
import { HttpInterceptor } from './services/http-interceptor';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { CommonService } from './services/common.service';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent},
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', canActivate: [AuthGuard], loadChildren: './layout/layout.module#LayoutModule'},
  // { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', component: PageNotFoundComponent }
  // { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    SweetAlert2Module.forRoot(),
    BrowserModule,
    HttpModule,
    FormsModule,
    LayoutModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.rectangleBounce,
      // backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      // backdropBorderRadius: '4px',
      primaryColour: '#00B96F'
    }),
    Ng2TelInputModule,
    // ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AdminService, CommonService, AuthGuard, HttpInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
