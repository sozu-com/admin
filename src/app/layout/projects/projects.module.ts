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
import { ProjectsComponent } from './projects.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SharedModule } from 'src/app/modules/shared.module';
import { NumberexPipe } from 'src/app/pipes/numberex.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


const routes: Routes = [
  {
    path: 'details/:project_id', component: ProjectDetailsComponent,
    canActivate: [AclUserGuard], data: { roles: ['Project Management', 'can_read', 'can_data_collector'] }
  },
  {
    path: 'view-projects', component: ProjectsComponent,
    canActivate: [AclUserGuard], data: { roles: ['Project Management', 'can_read', 'can_data_collector'] }
  },
  {
    path: 'view-projects/:type/:id', component: ProjectsComponent,
    canActivate: [AclUserGuard], data: { roles: ['Project Management', 'can_read', 'can_data_collector'] }
  },
  {
    path: 'add-project', component: AddProjectComponent,
    canActivate: [AclUserGuard], data: { roles: ['Project Management', 'can_create', 'can_data_collector'] }
  },
  {
    path: 'edit-project/:id', component: AddProjectComponent,
    canActivate: [AclUserGuard], data: { roles: ['Project Management', 'can_update', 'can_data_collector'] }
  },
  {
    path: 'edit-building-request/:request_id', component: AddProjectComponent,
    canActivate: [AclUserGuard], data: { roles: ['Project Management', 'can_update', 'can_data_collector'] }
  }
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
    MalihuScrollbarModule.forRoot(),
    TranslateModule,
    NgMultiSelectDropDownModule.forRoot(),
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
