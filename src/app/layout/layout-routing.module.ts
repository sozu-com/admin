import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// importing components
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './../guards/auth.guard';
import { InhouseUsersComponent } from './inhouse-users/inhouse-users.component';
import { GenerateThumbComponent } from './generate-thumb/generate-thumb.component';
import { AclUserGuard } from '../guards/acl-user.guard';

const routes: Routes = [
    {
        path: 'dashboard', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'view-inhouse-users/:userType', component: InhouseUsersComponent,
                canActivate: [AclUserGuard], data: {roles: ['', '', '']}},
            // { path: 'change-password', component: ChangePasswordComponent},
            { path: 'notary', loadChildren: './notary/notary.module#NotaryModule'},
            { path: 'banks', loadChildren: './banks/banks.module#BanksModule'},
            { path: 'developers', loadChildren: './developers/developers.module#DevelopersModule'},
            { path: 'users', loadChildren: './users/users.module#UsersModule'},
            { path: 'leads', loadChildren: './leads/leads.module#LeadsModule'},
            { path: 'manual-leads', loadChildren: './manual-leads/manual-leads.module#ManualLeadsModule'},
            { path: 'templates', loadChildren: './templates/templates.module#TemplatesModule' },
            { path: 'generate-thumb', component: GenerateThumbComponent},
            { path: 'reports', loadChildren: './reports/reports.module#ReportsModule'},
            { path: 'access-control-mgt', loadChildren: './acl/acl.module#AclModule'},
            { path: 'appointments', loadChildren: './appointments/appointments.module#AppointmentsModule'},
            // { path: 'notifications', component: NotificationsComponent},
            { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsModule'},
            { path: 'settings', loadChildren: './settings/settings.module#SettingsModule'},
            { path: 'properties', loadChildren: './properties/properties.module#PropertiesModule'},
            { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule'},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LayoutRoutingModule { }
