import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// importing components
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { AuthGuard } from './../services/auth.guard';
import { InhouseUsersComponent } from './inhouse-users/inhouse-users.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';

const routes: Routes = [
    {
        path: 'dashboard', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'view-inhouse-users/:userType', component: InhouseUsersComponent},
            { path: 'change-password', component: ChangePasswordComponent },
            { path: 'notary', loadChildren: './notary/notary.module#NotaryModule' },
            { path: 'banks', loadChildren: './banks/banks.module#BanksModule' },
            { path: 'users', loadChildren: './users/users.module#UsersModule' },
            { path: 'leads', loadChildren: './leads/leads.module#LeadsModule' },
            { path: 'edit-template', component: EditTemplateComponent},
            { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
            { path: 'properties', loadChildren: './properties/properties.module#PropertiesModule' },
            { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LayoutRoutingModule { }
