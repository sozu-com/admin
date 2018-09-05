import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
import { IProperty } from './../../../common/property';
import { Constant } from './../../../common/constants';
import { NgForm } from '@angular/forms';
import { FillInformation } from './../../../models/leads.model';
import { NouisliderModule } from 'ng2-nouislider';

@Component({
  selector: 'app-fill-information',
  templateUrl: './fill-information.component.html',
  styleUrls: ['./fill-information.component.css'],
  providers: [FillInformation]
})

export class FillInformationComponent implements OnInit {

  @Input('lead_id') lead_id;
  @Input('proximity_places') proximity_places;
  @Input('fillInfo') fillInfo;

  public parameter: IProperty = {};
  constructor(private admin: AdminService, public constant: Constant, public model: FillInformation) { }

  ngOnInit() {
    // console.log('dd', this.proximity_places);
    console.log('dd', this.fillInfo);
    this.model.lead_id = this.lead_id;

    // setTimeout(() => {
    //   if (this.prefs) {
    //     this.setModel();
    //   }
    // }, 1000);
// console.log('model', this.model);
//     this.model.proximity_place_ids = this.proximity_places;
    this.getPrefOptions();
  }

  getPrefOptions() {
    this.admin.postDataApi('leads/getPrefOptions', {lead_id: this.lead_id}).subscribe(r => {
      this.parameter.proximity_places = r.data.proximity_places;
      this.parameter.car_types = r.data.car_types;
      console.log('leads/getPrefOptions', this.parameter.items);
    });
  }

  addPreferences() {
    console.log(this.model);
    // this.admin.postDataApi('leads/addPreferences', {lead_id: this.lead_id}).subscribe(r => {
    //   this.parameter.proximity_places = r.data.proximity_places;
    //   this.parameter.car_types = r.data.car_types;
    //   console.log('leads/getPrefOptions', this.parameter.items);
    // });
  }
}
