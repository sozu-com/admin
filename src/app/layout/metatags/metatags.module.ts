// third party libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AgmCoreModule } from '@agm/core';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { Routes, RouterModule } from '@angular/router';

// components
import { AclUserGuard } from '../../guards/acl-user.guard';
import { SharedModule } from 'src/app/modules/shared.module';
import { MetatagsComponent } from './metatags.component';
// import { DevelopersComponent } from '../developers/developers.component';
import { ForSaleComponent } from './for-sale/for-sale.component';
import { HomeComponent } from './home/home.component';
import { MortageLoansComponent } from './mortage-loans/mortage-loans.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { RentComponent } from './rent/rent.component';
import { SellComponent } from './sell/sell.component';
import { NewDevComponent } from './new-dev/new-dev.component';

const routes: Routes = [
    {
        path: 'metatag-home', component: HomeComponent,
        canActivate: [AclUserGuard], data: { roles: ['Metatags', 'can_read', ''] }
    },
    {
        path: 'metatag-sale', component: ForSaleComponent,
        canActivate: [AclUserGuard], data: { roles: ['Metatags', 'can_read', ''] }
    },
    {
        path: 'metatag-rent', component: RentComponent,
        canActivate: [AclUserGuard], data: { roles: ['Metatags', 'can_read', ''] }
    },
    {
        path: 'metatag-sell', component: SellComponent,
        canActivate: [AclUserGuard], data: { roles: ['Metatags', 'can_read', ''] }
    },
    {
        path: 'metatag-mortage-loans', component: MortageLoansComponent,
        canActivate: [AclUserGuard], data: { roles: ['Metatags', 'can_read', ''] }
    },
    {
        path: 'metatag-new-project', component: NewProjectComponent,
        canActivate: [AclUserGuard], data: { roles: ['Metatags', 'can_read', ''] }
    },
    {
        path: 'metatag-devloper', component: NewDevComponent,
        canActivate: [AclUserGuard], data: { roles: ['Metatags', 'can_read', ''] }
    }
];


@NgModule({

    declarations: [
        MetatagsComponent,
        // DevelopersComponent,
        ForSaleComponent,
        HomeComponent,
        MortageLoansComponent,
        NewProjectComponent,
        RentComponent,
        SellComponent,
        NewDevComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),      // modal
        NgxSpinnerModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
            libraries: ['drawing', 'places']
        }),
        Ng2TelInputModule,
        SharedModule
    ],
    exports: [RouterModule]
})

export class MetatagsModule { }
