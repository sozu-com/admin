import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-edit-manual-lead',
  templateUrl: './add-edit-manual-lead.component.html',
  styleUrls: ['./add-edit-manual-lead.component.css']
})
export class AddEditManualLeadComponent implements OnInit {

  public model: any = {};
  
  constructor(
    public constant: Constant,
    private admin: AdminService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goBack = (): void => {
    this.router.navigate(['dashboard/manual-leads/view-all', { for: 'back' }])
  }

}
