import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AgmCoreModule } from '@agm/core';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { Routes, RouterModule } from '@angular/router';

import { LocationComponent } from './location/location.component';
import { SettingsComponent } from './settings.component';
import { LocalityComponent } from './locality/locality.component';
import { PropertyComponent } from './property/property.component';
import { ProjectComponent } from './project/project.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DocumentsComponent } from './documents/documents.component';
import { AclUserGuard } from '../../guards/acl-user.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: 'view-profile', component: ProfileComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'edit-profile', component: EditProfileComponent,
    canActivate: [AclUserGuard], data: {roles: ['Settings', 'can_read', '']}},
  { path: 'setting-location', component: LocationComponent,
    canActivate: [AclUserGuard], data: {roles: ['Settings', 'can_read', '']}},
  { path: 'setting-locality', component: LocalityComponent,
    canActivate: [AclUserGuard], data: {roles: ['Settings', 'can_read', '']}},
  { path: 'setting-property', component: PropertyComponent,
    canActivate: [AclUserGuard], data: {roles: ['Settings', 'can_read', '']}},
  { path: 'setting-project', component: ProjectComponent,
    canActivate: [AclUserGuard], data: {roles: ['Settings', 'can_read', '']}},
  { path: 'documents-listing', component: DocumentsComponent,
    canActivate: [AclUserGuard], data: {roles: ['Settings', 'can_read', '']}}
];

// const routes: Routes = [
//   { path: 'edit-profile', component: EditProfileComponent,
//     canActivate: [AuthGuard], data: {roles: ['Settings', 'can_read', '']}},
//   { path: 'setting-location', component: LocationComponent,
//     canActivate: [AuthGuard], data: {roles: ['Settings', 'can_read', '']}},
//   { path: 'setting-locality', component: LocalityComponent,
//     canActivate: [AuthGuard], data: {roles: ['Settings', 'can_read', '']}},
//   { path: 'setting-property', component: PropertyComponent,
//     canActivate: [AuthGuard], data: {roles: ['Settings', 'can_read', '']}},
//   { path: 'setting-project', component: ProjectComponent,
//     canActivate: [AuthGuard], data: {roles: ['Settings', 'can_read', '']}},
//   { path: 'documents-listing', component: DocumentsComponent,
//     canActivate: [AuthGuard], data: {roles: ['Settings', 'can_read', '']}}
// ];

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
    ChangePasswordComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),      // modal
    LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.rectangleBounce,
        // backdropBackgroundColour: 'rgba(0,0,0,0.5)',
        // backdropBorderRadius: '4px',
        primaryColour: '#00B96F'
    }),
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyCud9LaXE2hvv41JyXztnjugMxKO8QWLHQ',
        apiKey: 'AIzaSyCYv_zELZGVo2Ehzgp8eh8UeSIidhMCmH8',
        libraries: ['drawing']
      }),
    Ng2TelInputModule
  ],
  exports: [RouterModule]
})

export class SettingsModule { }
