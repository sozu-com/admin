// third party libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Routes, RouterModule } from '@angular/router';
// import { AgmCoreModule } from '@agm/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

// general components
import { AclUserGuard } from '../../guards/acl-user.guard';
import { AddTemplateComponent } from './add-template/add-template.component';
import { TemplatesComponent } from './templates.component';

const routes: Routes = [
{ path: 'view-all', component: TemplatesComponent,
    canActivate: [AclUserGuard], data: {roles: ['Templates', 'can_read', '']}},
{ path: 'add-template/:id', component: AddTemplateComponent,
    canActivate: [AclUserGuard], data: {roles: ['Templates', 'can_create', '']}},
{ path: 'edit-template/:id', component: AddTemplateComponent,
    canActivate: [AclUserGuard], data: {roles: ['Templates', 'can_update', '']}}
];

@NgModule({

  declarations: [
    TemplatesComponent,
      AddTemplateComponent
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
        primaryColour: '#00B96F'
    }),
    NgxPaginationModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  exports: [RouterModule]
})

export class TemplatesModule { }
