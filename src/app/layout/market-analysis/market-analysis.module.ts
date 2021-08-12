import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationAnalysisComponent } from './location-analysis/location-analysis.component';
import { ProjectAnalysisComponent } from './project-analysis/project-analysis.component';
import { AclUserGuard } from 'src/app/guards/acl-user.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CalendarModule } from 'primeng/primeng';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/modules/shared.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'project-analysis', component: ProjectAnalysisComponent,
    canActivate: [AclUserGuard], data: { roles: ['Property Management', 'can_create', 'can_csr_seller'] }
  },
  {
    path: 'location-analysis', component: LocationAnalysisComponent,
    canActivate: [AclUserGuard], data: { roles: ['Property Management', 'can_create', 'can_csr_seller'] }
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    CalendarModule,
    SharedModule,
    TranslateModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxChartsModule,
    NgxSpinnerModule
  ],
  declarations: [
    ProjectAnalysisComponent,
    LocationAnalysisComponent
  ]
})
export class MarketAnalysisModule { }
