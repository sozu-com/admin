// third party libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LazyLoadImageModule } from 'ng-lazyload-image';

// general components
import { AclUserGuard } from '../../guards/acl-user.guard';
import { AddTemplateComponent } from './add-template/add-template.component';
import { TemplatesComponent } from './templates.component';
import { SharedModule } from 'src/app/modules/shared.module';

const routes: Routes = [
  {
    path: 'view-all', component: TemplatesComponent,
    canActivate: [AclUserGuard], data: { roles: ['Templates', 'can_read', ''] }
  },
  {
    path: 'add-template/:id', component: AddTemplateComponent,
    canActivate: [AclUserGuard], data: { roles: ['Templates', 'can_create', ''] }
  },
  {
    path: 'edit-template/:id', component: AddTemplateComponent,
    canActivate: [AclUserGuard], data: { roles: ['Templates', 'can_update', ''] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    ModalModule.forRoot(),
    NgxSpinnerModule,
    NgxPaginationModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    SharedModule
  ],
  declarations: [
    TemplatesComponent,
    AddTemplateComponent
  ],
  exports: [RouterModule]
})

export class TemplatesModule { }
