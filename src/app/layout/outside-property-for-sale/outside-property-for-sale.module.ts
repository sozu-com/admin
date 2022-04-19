import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgmCoreModule } from '@agm/core';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalendarModule } from 'primeng/primeng';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/modules/shared.module';
import { OutsidePropertyForSaleComponent } from './outside-property-for-sale.component';
import { RouterModule, Routes } from '@angular/router';
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { OutsidePropertyDetailComponent } from './outside-property-detail/outside-property-detail.component';

const routes: Routes = [
    {
        path: 'outside', component: OutsidePropertyForSaleComponent,
        canActivate: [AclUserGuard], data: { roles: ['Properties For Sale Management', 'can_read', ''] }
    },
    { path: 'details/:property_id', component: OutsidePropertyDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCHX_-aQlnqaVaJyo3Prw54qX_ECT6wC6w',
            libraries: ['drawing', 'places']
        }),
        Ng2TelInputModule,
        NgxPaginationModule,
        CalendarModule,
        SharedModule,
        LazyLoadImageModule,
        NgMultiSelectDropDownModule.forRoot(),
        MalihuScrollbarModule.forRoot(),
        TranslateModule,
        NgxMaskModule.forRoot()
    ],
    declarations: [
        OutsidePropertyForSaleComponent,
        OutsidePropertyDetailComponent
    ]
})
export class OutsidePropertyForSaleModule { }
