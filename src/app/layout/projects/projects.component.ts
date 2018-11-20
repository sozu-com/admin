import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProperty } from '../../common/property';
import { Constant } from './../../common/constants';
import * as moment from 'moment';
declare let swal: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  public parameter: IProperty = {};
  public location: IProperty = {};

  items: any= [];
  total: any= 0;
  configurations: any= [];
  countries: any;
  reason: string;
  price_sort = 1;
  availability_sort = 1;
  lead_sort = 1;

  constructor(
    public constant: Constant,
    private element: ElementRef,
    private route: ActivatedRoute,
    public admin: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.parameter.data_collector_id = params.id;
    });
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = 2;
    this.parameter.flag = 3;
    this.getCountries();
    this.getPropertyConfigurations();
    this.getListing();
  }

  getListing() {
    this.parameter.loading = true;
    const input: any = JSON.parse(JSON.stringify(this.parameter));
    if (this.parameter.min) {
      input.min = moment(this.parameter.min).format('YYYY-MM-DD');
    }
    if (this.parameter.max) {
      input.max = moment(this.parameter.max).format('YYYY-MM-DD');
    }
    this.admin.postDataApi('projectHome', input).subscribe(
      success => {
        this.items = success.data;
        this.total = success.total_count;
        this.parameter.loading = false;
      },
      error => {
        this.parameter.loading = false;
      });
  }

  getCountries() {
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      this.location.countries = r['data'];
    });
  }

  getPropertyConfigurations() {
    this.admin.postDataApi('getConfigurations', {}).subscribe(r => {
      this.configurations = r['data'];
    });
  }

  onCountryChange(id) {
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id === 0) {
      this.parameter.state_id = '0';
      return false;
    }

    this.parameter.country_id = id;
    const selectedCountry = this.location.countries.filter(x => x.id == id);
    this.location.states = selectedCountry[0].states;
  }

  onStateChange(id) {
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id === 0) {
      this.parameter.city_id = '0';
      return false;
    }

    this.parameter.state_id = id;
    const selectedState = this.location.states.filter(x => x.id == id);
    this.location.cities = selectedState[0].cities;
  }

  onCityChange(id) {
    if (!id || id == 0) {
      this.parameter.locality_id = '0';
      return false;
    }

    this.parameter.city_id = id;
    const selectedCountry = this.location.cities.filter(x => x.id == id);
    this.location.localities = selectedCountry[0].localities;
  }

  onLocalityChange(id) {
    if (!id || id == 0) {
      return false;
    }

    this.parameter.locality_id = id;
    // let selectedLocation = this.location.localities.filter(x=>x.id == id);
    // this.location.locality = selectedLocation[0];
  }

  changeFlag(flag) {
    this.parameter.flag = flag;
    this.getListing();
  }

  toggleAndSort(sort_by, sort_by_order) {
    if (this[sort_by_order] == 1) {
      this[sort_by_order] = 2;
    }else {
      this[sort_by_order] = 1;
    }

    this.parameter.sort_by = sort_by;
    this.parameter.sort_by_order = sort_by_order;
    this.getListing();
  }


  getPage(page) {
    this.parameter.page = page;
    this.getListing();
  }

  block(item) {
    item.is_blocked = true;
    this.admin.postDataApi('blockProject', {building_id: item.id, flag: 1}).subscribe(r => {
      swal('Success', 'Project blocked successfully.', 'success');
    },
    error => {
      swal('Error', error.error.message, 'error');
    });
  }

  unblock(item) {
    item.is_blocked = false;
    this.admin.postDataApi('blockProject', {building_id: item.id, flag: 0 }).subscribe(r => {
      swal('Success', 'Project unblocked successfully.', 'success');
    },
    error => {
      swal('Error', error.error.message, 'error');
    });
  }

  approveProject(item, status) {
    item.status = status;
    this.admin.postDataApi('approveProject', {building_id: item.id }).subscribe(r => {
      console.log(r);
      swal('Success', 'Project approved successfully.', 'success');
    },
    error => {
      swal('Error', error.error.message, 'error');
    });
  }

  rejectProject(status) {
    this.items[this.parameter.index].status = status;
    this.admin.postDataApi('rejectProject', {building_id: this.parameter.building_id, reason: this.reason }).subscribe(r => {
      console.log(r);
      swal('Success', 'Project unapproved successfully.', 'success');
      this.closeModal();
    },
    error => {
      swal('Error', error.error.message, 'error');
    });
  }

  openCancellationModal(item, index) {
    this.parameter.building_id = item.id;
    this.parameter.index = index;
    this.modalOpen.nativeElement.click();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
  }
}
