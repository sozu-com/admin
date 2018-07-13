import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// importing components
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../auth.guard';
import { LocationComponent } from './settings/location/location.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { PropertyComponent } from './settings/property/property.component';
import { ProjectComponent } from './settings/project/project.component';
import { DataCollectorComponent } from './inhouse-users/data-collector/data-collector.component';
import { LocalityComponent } from './settings/locality/locality.component';
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
            { path: 'view-data-collectors', component: InhouseUsersComponent},
            { path: 'view-csr-sellers', component: InhouseUsersComponent},
            // { path: 'view-data-collectors', component: DataCollectorComponent},
            { path: 'change-password', component: ChangePasswordComponent },
            { path: 'setting-location', component: LocationComponent},
            { path: 'setting-locality', component: LocalityComponent},
            { path: 'setting-property', component: PropertyComponent},
            { path: 'setting-project', component: ProjectComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LayoutRoutingModule { }
