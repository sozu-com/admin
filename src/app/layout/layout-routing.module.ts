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
import { LocalityComponent } from './settings/locality/locality.component';
import { InhouseUsersComponent } from './inhouse-users/inhouse-users.component';
// import { DataCollectorComponent } from './inhouse-users/data-collector/data-collector.component';
// import { CsrSellerComponent } from './inhouse-users/csr-seller/csr-seller.component';
// import { CsrBuyerComponent } from './inhouse-users/csr-buyer/csr-buyer.component';
// import { InhouseBrokerComponent } from './inhouse-users/inhouse-broker/inhouse-broker.component';
// import { CsrCloserComponent } from './inhouse-users/csr-closer/csr-closer.component';

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
            // { path: 'view-data-collectors', component: InhouseUsersComponent},
            // { path: 'view-csr-sellers', component: InhouseUsersComponent},
            // { path: 'view-csr-buyers', component: InhouseUsersComponent},
            // { path: 'view-inhouse-broker', component: InhouseUsersComponent},
            // { path: 'view-csr-closers', component: InhouseUsersComponent},
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
