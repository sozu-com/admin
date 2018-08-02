import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { Routes, RouterModule } from '@angular/router';
import { AddProjectComponent } from './add-project/add-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

const routes: Routes = [
  { path: 'add-project', component: AddProjectComponent },
  { path: 'view-projects', component: ProjectsComponent }
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
  ],
  declarations: [
    ProjectsComponent,
    AddProjectComponent
  ]
})

export class ProjectsModule { }
