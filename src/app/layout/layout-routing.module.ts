import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// importing components
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './../guards/auth.guard';
import { InhouseUsersComponent } from './inhouse-users/inhouse-users.component';
import { GenerateThumbComponent } from './generate-thumb/generate-thumb.component';
import { AclUserGuard } from '../guards/acl-user.guard';
import { OutSideAddComponent } from './inhouse-users/out-side-add/out-side-add.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    // path: 'dashboard', component: LayoutComponent, canActivate: [AclUserGuard],
    // data: {roles: ['Dashboard', 'can_read', '']},
    children: [
      { path: '', component: DashboardComponent },
      { path: 'market-analysis', loadChildren: './market-analysis/market-analysis.module#MarketAnalysisModule' },
      {
        path: 'view-inhouse-users/:userType',
        component: InhouseUsersComponent,
        canActivate: [AclUserGuard],
        data: { roles: ['', '', ''] }
      },
      {
        path: 'out-side-add',
        component: OutSideAddComponent,
        canActivate: [AclUserGuard],
        data: { roles: ['', '', ''] }
      },
      {
        path: 'view-inhouse-users/:userType/:id',
        component: InhouseUsersComponent,
        canActivate: [AclUserGuard],
        data: { roles: ['', '', ''] }
      },
      // { path: 'change-password', component: ChangePasswordComponent},
      { path: 'notary', loadChildren: './notary/notary.module#NotaryModule' },

      { path: 'banks', loadChildren: './banks/banks.module#BanksModule' },
      {
        path: 'developers',
        loadChildren: './developers/developers.module#DevelopersModule'
      },
      {
        path: 'agencies',
        loadChildren: './agencies/agencies.module#AgenciesModule'
      },
      {
        path: 'companies',
        loadChildren: './companies/companies.module#CompaniesModule'
      },
      {
        path: 'hotel-companies',
        loadChildren: './hotel-companies/hotel-companies.module#HotelCompaniesModule'
      },
      {
        path: 'managers',
        loadChildren: './managers/managers.module#ManagersModule'
      },
      // { path: 'agents', loadChildren: './agents/agents.module#AgentsModule'},
      { path: 'users', loadChildren: './users/users.module#UsersModule' },
      { path: 'leads', loadChildren: './leads/leads.module#LeadsModule' },
      {
        path: 'manual-leads',
        loadChildren: './manual-leads/manual-leads.module#ManualLeadsModule'
      },
      {
        path: 'templates',
        loadChildren: './templates/templates.module#TemplatesModule'
      },
      { path: 'generate-thumb', component: GenerateThumbComponent },
      {
        path: 'reports',
        loadChildren: './reports/reports.module#ReportsModule'
      },
      {
        path: 'access-control-mgt',
        loadChildren: './acl/acl.module#AclModule'
      },
      {
        path: 'appointments',
        loadChildren: './appointments/appointments.module#AppointmentsModule'
      },
      // { path: 'notifications', component: NotificationsComponent},
      {
        path: 'notifications',
        loadChildren: './notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule'
      },
      {
        path: 'metatags',
        loadChildren: './metatags/metatags.module#MetatagsModule'
      },
      {
        path: 'cash',
        loadChildren: './cash/cash.module#cashModule'
      },
      {
        path: 'properties',
        loadChildren: './properties/properties.module#PropertiesModule'
      },
      {
        path: 'suppliers',
        loadChildren: './suppliers/suppliers.module#SuppliersModule'
      },
      {
        path: 'projects',
        loadChildren: './projects/projects.module#ProjectsModule'
      },
      {
        path: 'office',
        loadChildren: './manage-office/manage-office.module#ManageOfficeModule'
      },
      {
        path: 'hotels',
        loadChildren: './hotels/hotels.module#HotelsModule'
      },
      {
        path: 'collections',
        loadChildren: './collections/collections.module#CollectionsModule'
      },
      {
        path: 'legal-entities',
        loadChildren: './legal-entity/legal-entity.module#LegalEntityModule'
      },
      {
        path: 'manage-contracts',
        loadChildren: './manage-contracts/manage-contracts.module#ManageContractsModule'
      },
      {
        path: 'collection-report',
        loadChildren: './collection-report/collection-report.module#CollectionReportModule'
      },
      {
        path: 'credit',
        loadChildren: './credit/credit.module#CreditModule'
      },
      {
        path: 'commissions',
        loadChildren: './manage-commissions/manage-commissions.module#ManageCommissionsModule'
      },
      {
        path: 'income',
        loadChildren: './sozu-income/sozu-income.module#SozuIncomeModule'
      },
      {
        path: 'properties-for-sale',
        loadChildren: './properties-for-sale/properties-for-sale.module#PropertiesForSaleModule'
      },
      {
        path: 'outside-property-for-sale',
        loadChildren: './outside-property-for-sale/outside-property-for-sale.module#OutsidePropertyForSaleModule'
      },
      {
        path: 'product',
        loadChildren: './manage-product/manage-product.module#ManageProductModule'
      },
      {
        path: 'roles',
        loadChildren: './manage-roles/manage-roles.module#ManageRolesModule'
      },
       {
         path: 'property-sold',
         loadChildren: './property-sold/property-sold.module#PropertySoldModule'
       },
      // {
      //   path: 'outside-property-sold',
      //   loadChildren: './outside-property-sold/outside-property-sold.module#OutsidePropertySoldModule'
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
