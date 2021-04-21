import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesForSaleRoutingModule } from './properties-for-sale-routing.module';
import { PropertiesForSaleListingComponent } from './properties-for-sale-listing/properties-for-sale-listing.component';
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

@NgModule({
  imports: [
    PropertiesForSaleRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
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
    PropertiesForSaleListingComponent
  ]
})
export class PropertiesForSaleModule { }
