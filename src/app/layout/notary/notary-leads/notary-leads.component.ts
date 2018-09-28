import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { IProperty } from '../../../common/property';
import { Constant } from './../../../common/constants';
import { Users } from '../../../models/users.model';
import { AddNotaryAvailabilty, NotaryLeads } from '../../../models/leads.model';
import { ChatTimePipe } from '../../../pipes/chat-time.pipe';
declare let swal: any;

@Component({
  selector: 'app-notary-leads',
  templateUrl: './notary-leads.component.html',
  styleUrls: ['./notary-leads.component.css'],
  providers: [AddNotaryAvailabilty, NotaryLeads]
})
export class NotaryLeadsComponent implements OnInit {

  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  public parameter: IProperty = {};
  items: Array<NotaryLeads> = [];
  data = [];
  date: any;
  time: any;
  constructor(
    private admin: AdminService,
    private constant: Constant,
    private availability: AddNotaryAvailabilty
  ) { }

  ngOnInit() {
    this.parameter.page = this.constant.p;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.flag = 2;
    this.getListing();
    this.data = ['2018-02-02, 12:00PM', '2018-02-02, 12:00PM', '2018-02-02, 12:00PM'];
  }

  getPage(page) {
    this.parameter.page = page;
    this.getListing();
  }

  changeFlag(flag) {
    this.parameter.flag = flag;
    this.getListing();
  }

  changeFilter(key, value) {
    this.parameter[key] = value;
    this.getListing();
  }

  addDateTime () {
    if (this.date && this.time) {
      console.log(this.date, this.time);
      const newdate = this.date + ' ' + this.time + ':00';
      console.log(newdate);
      const d = new ChatTimePipe().transform(newdate, 'YYYY-MM-DD HH:MM:SS', 3);
      console.log('===========', d);
      this.availability.date_time.push({date_time: d});
      this.items[this.parameter.index].selected_properties[0].selected_noatary[0].noatary_availability.push({id: 0, date_time: this.date});
    }
  }

  openModal (item, index) {
    this.availability.date_time = item.selected_properties[0].selected_noatary[0].noatary_availability;
    this.availability.property_id = item.selected_properties[0].property_id;
    this.availability.lead_id = item.id;
    this.parameter.index = index;
    this.data = item.selected_properties[0].selected_noatary[0].noatary_availability;
    this.modalOpen.nativeElement.click();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
  }

  getListing() {
    this.admin.postDataApi('leads/noataries', this.parameter)
      .subscribe(
        success => {
          this.items = success.data;
          this.parameter.total = success.total_count;
        }
      );
  }

  add() {
    console.log('====', this.availability);
    // this.admin.postDataApi('leads/addNoataryAvailability', this.availability)
    //   .subscribe(
    //     success => {
    //       this.items = success.data;
    //       this.parameter.total = success.total_count;
    //     }
    //   );
  }
}
