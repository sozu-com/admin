// third party libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgmCoreModule } from '@agm/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CalendarModule } from 'primeng/primeng';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

// general components
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { SharedModule } from 'src/app/modules/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HotelsComponent } from './hotels.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';


const routes: Routes = [
  {
    path: 'view-hotels', component: HotelsComponent,
    canActivate: [AclUserGuard], data: { roles: ['Hotel Management', 'can_read', 'can_data_collector'] }
  },
  {
    path: 'add-hotel', component: AddHotelComponent,
    canActivate: [AclUserGuard], data: { roles: ['Hotel Management', 'can_create', 'can_data_collector'] }
  },
  {
    path: 'edit-hotel/:id', component: AddHotelComponent,
    canActivate: [AclUserGuard], data: { roles: ['Hotel Management', 'can_update', 'can_data_collector'] }
  },
  {
    path: 'details/:hotel_id', component: HotelDetailsComponent,
    canActivate: [AclUserGuard], data: { roles: ['Hotel Management', 'can_read', 'can_data_collector'] }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
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
    MalihuScrollbarModule.forRoot(),
    TranslateModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [
    HotelsComponent,
    AddHotelComponent,
    HotelDetailsComponent
    // ImgPipe
  ]
})

export class HotelsModule { }
