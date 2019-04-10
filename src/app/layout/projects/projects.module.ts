// third party libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { AgmCoreModule } from '@agm/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { LazyLoadImageModule } from 'ng-lazyload-image';

// general components
import { ProjectsComponent } from './projects.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AclUserGuard } from '../../guards/acl-user.guard';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SharedModule } from '../../modules/shared.module';
import { NumberexPipe } from '../../pipes/numberex.pipe';
import { CalendarModule } from 'primeng/primeng';
// import { ImgPipe } from '../../pipes/img.pipe';


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
    canActivate: [AclUserGuard], data: {roles: ['Building Management', 'can_update', 'can_data_collector']}},
  { path: 'edit-building-request/:request_id', component: AddProjectComponent,
    canActivate: [AclUserGuard], data: {roles: ['Building Management', 'can_update', 'can_data_collector']}}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.rectangleBounce,
      primaryColour: '#00B96F'
    }),
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
        libraries: ['drawing', 'places']
      }),
    Ng2TelInputModule,
    NgxPaginationModule,
    CalendarModule,
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
