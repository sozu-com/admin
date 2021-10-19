import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalendarModule, DropdownModule } from 'primeng/primeng';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SozuIncomeComponent } from './sozu-income.component';

const routes: Routes = [
    {
        path: 'sozu-income', component: SozuIncomeComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NgxPaginationModule,
        CalendarModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        DropdownModule,
        ToastrModule.forRoot({
            maxOpened: 1,
            preventDuplicates: true,
            autoDismiss: true
        }),
        NgMultiSelectDropDownModule.forRoot(),
    ],
    declarations: [
        SozuIncomeComponent
    ]
})
export class SozuIncomeModule { }
