import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminService } from './services/admin.service';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './services/auth.guard';
import { SweetAlertService } from 'ngx-sweetalert2';
import {Ng2TelInputModule} from 'ng2-tel-input';

import { AppComponent } from './app.component';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
// import { SignupComponent } from './signup/signup.component';
import { LayoutModule } from './layout/layout.module';
import { HttpInterceptor } from './services/http-interceptor';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  // { path: 'forgot-password', component: ForgotPasswordComponent },
  // { path: 'dashboard', canActivate: [AuthGuard], loadChildren: './layout/layout.module#LayoutModule'},
  { path: '**', component: PageNotFoundComponent }
  // { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  declarations: [
    AppComponent,
    // ForgotPasswordComponent,
    // SignupComponent,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    // NgbModule.forRoot(),
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
    Ng2TelInputModule
  ],
  providers: [AdminService, AuthGuard, SweetAlertService, HttpInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
