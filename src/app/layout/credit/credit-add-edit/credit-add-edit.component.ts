import { MapsAPILoader } from '@agm/core';
import { NgZone } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from 'src/app/common/constants';
import { Users } from 'src/app/models/users.model';
import { AdminService } from 'src/app/services/admin.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-credit-add-edit',
  templateUrl: './credit-add-edit.component.html',
  styleUrls: ['./credit-add-edit.component.css']
})
export class CreditAddEditComponent implements OnInit {

  model: Users = new Users();
  
  constructor(
    public constant: Constant,
    private commonService: CommonService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private translateService: TranslateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getListing();
    this.spinner.hide();
  }
  getListing() {
  //  this.spinner.show();
  }
}
