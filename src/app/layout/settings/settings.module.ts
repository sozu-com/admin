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
import { LocationComponent } from './location/location.component';
import { SettingsComponent } from './settings.component';
import { LocalityComponent } from './locality/locality.component';
import { PropertyComponent } from './property/property.component';
import { ProjectComponent } from './project/project.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DocumentsComponent } from './documents/documents.component';
import { AclUserGuard } from '../../guards/acl-user.guard';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DefaultSettingsComponent } from './default-settings/default-settings.component';
import { MatchValueDirective } from 'src/app/directives/match-value.directive';
import { SharedModule } from 'src/app/modules/shared.module';
import { HotelComponent } from './hotel/hotel.component';
import { RoomComponent } from './room/room.component';
import { OfficeComponent } from './office/office.component';

const routes: Routes = [
  { path: 'view-profile', component: ProfileComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  {
    path: 'default-settings', component: DefaultSettingsComponent,
    canActivate: [AclUserGuard], data: { roles: ['Settings', 'can_read', ''] }
  },
  { path: 'edit-profile', component: EditProfileComponent },
  {
    path: 'setting-location', component: LocationComponent,
    canActivate: [AclUserGuard], data: { roles: ['Settings', 'can_read', ''] }
  },
  {
    path: 'setting-locality', component: LocalityComponent,
    canActivate: [AclUserGuard], data: { roles: ['Settings', 'can_read', ''] }
  },
  {
    path: 'setting-property', component: PropertyComponent,
    canActivate: [AclUserGuard], data: { roles: ['Settings', 'can_read', ''] }
  },
  {
    path: 'setting-project', component: ProjectComponent,
    canActivate: [AclUserGuard], data: { roles: ['Settings', 'can_read', ''] }
  },
  {
    path: 'setting-office', component: OfficeComponent,
    canActivate: [AclUserGuard], data: { roles: ['Settings', 'can_read', ''] }
  },
  {
    path: 'setting-hotel', component: HotelComponent,
    canActivate: [AclUserGuard], data: { roles: ['Settings', 'can_read', ''] }
  },
  {
    path: 'setting-room', component: RoomComponent,
    canActivate: [AclUserGuard], data: { roles: ['Settings', 'can_read', ''] }
  },
  {
    path: 'documents-listing', component: DocumentsComponent,
    canActivate: [AclUserGuard], data: { roles: ['Settings', 'can_read', ''] }
  }
];


@NgModule({

  declarations: [
    EditProfileComponent,
    LocationComponent,
    LocalityComponent,
    PropertyComponent,
    ProjectComponent,
    SettingsComponent,
    DocumentsComponent,
    ProfileComponent,
    ChangePasswordComponent,
    DefaultSettingsComponent,
    MatchValueDirective,
    HotelComponent,
    RoomComponent,
    OfficeComponent
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

export class SettingsModule { }
