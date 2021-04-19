import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { PropertiesForSaleListingComponent } from './properties-for-sale-listing/properties-for-sale-listing.component';

const routes: Routes = [
  {
    path: 'view-properties-for-sale', component: PropertiesForSaleListingComponent,
    canActivate: [AclUserGuard], data: { roles: ['Properties For Sale Management', 'can_read', ''] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesForSaleRoutingModule { }
