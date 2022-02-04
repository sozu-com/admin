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
import { IncomeComponent } from './income/income.component';
import { ExpendituresComponent } from './expenditures/expenditures.component';
import { CashComponent } from './cash.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalendarModule } from 'primeng/primeng';
import { QuickVisualizationIncomeComponent } from './income/quick-visualization-income/quick-visualization-income.component';

const routes: Routes = [
    {
        path: 'income', component: IncomeComponent,
        canActivate: [AclUserGuard], data: { roles: ['Cashflow', 'can_read', ''] }
    },
    {
        path: 'expenditures', component: ExpendituresComponent,
        canActivate: [AclUserGuard], data: { roles: ['Cashflow', 'can_read', ''] }
    },
    {
        path: 'income/quick-visualization-income/:id', component: QuickVisualizationIncomeComponent
    }
];


@NgModule({

    declarations: [
        CashComponent,
        IncomeComponent,
        ExpendituresComponent,
        QuickVisualizationIncomeComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        CalendarModule,
        TranslateModule,
        FormsModule, NgxPaginationModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),      // modal
        NgxSpinnerModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCHX_-aQlnqaVaJyo3Prw54qX_ECT6wC6w',
            libraries: ['drawing', 'places']
        }),
        Ng2TelInputModule,
        SharedModule
    ],
    exports: [RouterModule]
})

export class cashModule { }
