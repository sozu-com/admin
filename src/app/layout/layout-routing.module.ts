import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// importing components
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './../services/auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { InhouseUsersComponent } from './inhouse-users/inhouse-users.component';

const routes: Routes = [
    {
        path: 'login', component: LoginComponent,
    },
    {
        path: 'forgot-password', component: ForgotPasswordComponent,
    },
    {
        path: 'dashboard', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'view-inhouse-users/:userType', component: InhouseUsersComponent},
            { path: 'change-password', component: ChangePasswordComponent },
            { path: 'users', loadChildren: './users/users.module#UsersModule' },
            { path: 'leads', loadChildren: './leads/leads.module#LeadsModule' },
            { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
            { path: 'properties', loadChildren: './properties/properties.module#PropertiesModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LayoutRoutingModule { }
