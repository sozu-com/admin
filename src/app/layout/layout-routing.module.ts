import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// importing components
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../auth.guard';
import { LocationComponent } from './settings/location/location.component';

const routes: Routes = [
    {
        path: 'login', component: LoginComponent,
    }, 
    {
        path: 'dashboard', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'change-password', component: ChangePasswordComponent },
            { path: 'setting-location', component: LocationComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LayoutRoutingModule { }
