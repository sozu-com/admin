import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { IProperty } from '../../../common/property';
import { Constant } from './../../../common/constants';
import { Users } from '../../../models/users.model';
import { AddNotaryAvailabilty, NotaryLeads } from '../../../models/leads.model';
import { ChatTimePipe } from '../../../pipes/chat-time.pipe';
declare let swal: any;
import {} from './../../../services/http-interceptor';
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
    public availability: AddNotaryAvailabilty
  ) { }

  ngOnInit() {
    this.parameter.page = this.constant.p;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.flag = 2;
    this.getListing();
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
      this.availability.date_time_array.push({date_time: d});
      this.date = ''; this.time = '';
    }
  }

  openModal (item, index) {
    // this.availability.date_time_array = item.selected_properties[0].selected_noatary[0].noatary_availability;
    this.availability.property_id = item.selected_properties[0].property_id;
    this.availability.lead_id = item.id;
    this.parameter.index = index;
    this.data = item.selected_properties[0].selected_noatary[0].noatary_availability;
    this.modalOpen.nativeElement.click();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
    this.availability = new AddNotaryAvailabilty();
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
    this.availability.date_time_array.forEach(element => {
      this.availability.date_time.push(element.date_time);
    });
    this.admin.postDataApi('leads/addNoataryAvailability', this.availability)
      .subscribe(
        success => {
          this.closeModal();
          swal('Success', 'Availability added successfully.', 'success');
          // this.items = success.data;
          // this.parameter.total = success.total_count;
        }
      );
  }

  removeNoataryAvailability(id, j) {
    this.admin.postDataApi('leads/removeNoataryAvailability', {id: id})
      .subscribe(
        success => {
          this.data.splice(j, 1);
          console.log('sssss', success);
          // this.items = success.data;
          // this.parameter.total = success.total_count;
        }
      );
  }

  removeNoatary(i) {
    this.availability.date_time_array.splice(i, 1);
  }
}
