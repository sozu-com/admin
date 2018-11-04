import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { Routes, RouterModule } from '@angular/router';
import { AddProjectComponent } from './add-project/add-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { AgmCoreModule } from '@agm/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { AclUserGuard } from '../../guards/acl-user.guard';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SharedModule } from '../../modules/shared.module';
import { NumberexPipe } from '../../pipes/numberex.pipe';
import { ImgPipe } from '../../pipes/img.pipe';
import LazyLoadImageModule from 'ng-lazyload-image';


const routes: Routes = [
  { path: 'details/:project_id', component: ProjectDetailsComponent,
    canActivate: [AclUserGuard], data: {roles: ['Building Management', 'can_read', '']}},
  { path: 'view-projects', component: ProjectsComponent,
    canActivate: [AclUserGuard], data: {roles: ['Building Management', 'can_read', '']}},
  { path: 'view-projects/:id', component: ProjectsComponent,
    canActivate: [AclUserGuard], data: {roles: ['Building Management', 'can_read', '']}},
  { path: 'add-project', component: AddProjectComponent,
    canActivate: [AclUserGuard], data: {roles: ['Building Management', 'can_create', '']}},
  { path: 'edit-project/:id', component: AddProjectComponent,
    canActivate: [AclUserGuard], data: {roles: ['Building Management', 'can_update', '']}}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.rectangleBounce,
        primaryColour: '#00B96F'
    }),
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCYv_zELZGVo2Ehzgp8eh8UeSIidhMCmH8',
        libraries: ['drawing', 'places']
      }),
    Ng2TelInputModule,
    NgxPaginationModule,
    SharedModule,
    LazyLoadImageModule
  ],
  declarations: [
    ProjectsComponent,
    AddProjectComponent,
    ProjectDetailsComponent,
    NumberexPipe,
    // ImgPipe
  ]
})

export class ProjectsModule { }
