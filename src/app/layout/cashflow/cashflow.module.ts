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
import { ExpendituresComponent } from './expenditures/expenditures.component';
import { IncomeComponent } from './income/income.component';
import { CashflowComponent } from './cashflow.component';

const routes: Routes = [
    {
        path: 'income', component: IncomeComponent,
        canActivate: [AclUserGuard], data: { roles: ['Cashflow', 'can_read', ''] }
    },
    {
        path: 'expenditures', component: ExpendituresComponent,
        canActivate: [AclUserGuard], data: { roles: ['Cashflow', 'can_read', ''] }
    }
];


@NgModule({

    declarations: [
        CashflowComponent,
        IncomeComponent,
        ExpendituresComponent,
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

export class cashflowModule { }
