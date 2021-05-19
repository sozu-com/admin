import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constant } from 'src/app/common/constants';
import { CommonService } from 'src/app/services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Leads } from 'src/app/models/leads.model';

declare let swal: any;

@Component({
  selector: 'app-add-edit-manual-lead',
  templateUrl: './add-edit-manual-lead.component.html',
  styleUrls: ['./add-edit-manual-lead.component.css']
})
export class AddEditManualLeadComponent implements OnInit {
  model:Leads;
  initialCountry: { initialCountry: string; };
  
  constructor(
    public constant: Constant,
    private translate: TranslateService,
    private cs: CommonService,
    private spinner: NgxSpinnerService,
    public admin: AdminService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.model = new Leads();
    this.initialCountry = {initialCountry: this.constant.country_code};
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;

    this.activeRoute.params.subscribe(params => {
      if (params['id'] !== '0') {
        this.model.id = params['id'];
        this.getManualLeadById(this.model.id);
      }
    });
  }

  onCountryChange(e){
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = { initialCountry: e.iso2 };
  }

  getManualLeadById(id){
    this.spinner.show();
    this.admin.postDataApi('getManualLeadDetail', {id : id})
    .subscribe(
      success => {
        this.model = success.data;
        this.spinner.hide();
      }, error=>{
        this.spinner.hide();
      });
  }

  add(addForm: NgForm){
    let input ={
      image: this.model.image,
      name: addForm.value.name,
      first_surname: addForm.value.first_surname,
      second_surname: addForm.value.second_surname,
      dial_code: this.model.dial_code,
      country_code: this.model.country_code,
      phone: addForm.value.phone,
      lead_type: addForm.value.lead_type,
      email: addForm.value.email
    }
    if(this.model.id){
      input['id'] = this.model.id;
    }
    this.spinner.show();
    this.admin.postDataApi(this.model.id? 'updateManualLead' : 'addManualLead', input)
      .subscribe(
        success => {
          this.route.navigate(['/dashboard/manual-leads/view-all'])
          this.spinner.hide();
        },error=>{
          this.spinner.hide();
          //swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
  }

  changeListner(event: any, paramLoader: string, param: any) {
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
      return false;
    }
    this.model[paramLoader] = true;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.model[param] = e.target.result;
      this.cs.saveImage(event.target.files[0]).subscribe(
        success => {
          this.model[paramLoader] = false;
          this.model[param] = success['data'].image;
        }
      );
    };
    reader.readAsDataURL(event.target.files[0]);
  }

}
