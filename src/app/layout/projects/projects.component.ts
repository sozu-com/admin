import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
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

  items: any = [];
  total: any = 0;
  configurations: any = [];
  countries: any;
  reason: string;
  price_sort = 1;
  availability_sort = 1;
  lead_sort = 1;

  constructor(
    public constant: Constant,
    private route: ActivatedRoute,
    public admin: AdminService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.parameter.data_collector_id = params.id;
    });
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = 2;
    this.getCountries();
    this.getPropertyConfigurations();
    this.getListing();
  }

  getListing() {
    this.parameter.loading = true;
    const input: any = JSON.parse(JSON.stringify(this.parameter));
    if (this.parameter.min) {
      input.min = moment(this.parameter.min).format('YYYY-MM-DD');
    } else {
      delete input.min;
    }
    if (this.parameter.max) {
      input.max = moment(this.parameter.max).format('YYYY-MM-DD');
    } else {
      delete input.max;
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

  // onCountryChange(id) {
  //   this.location.cities = []; this.parameter.city_id = '0';
  //   this.location.localities = []; this.parameter.locality_id = '0';
  //   if (!id || id === 0) {
  //     this.parameter.state_id = '0';
  //     return false;
  //   }

  //   this.parameter.country_id = id;
  //   const selectedCountry = this.location.countries.filter(x => x.id == id);
  //   this.location.states = selectedCountry[0].states;
  // }

  // onStateChange(id) {
  //   this.location.localities = []; this.parameter.locality_id = '0';
  //   if (!id || id === 0) {
  //     this.parameter.city_id = '0';
  //     return false;
  //   }

  //   this.parameter.state_id = id;
  //   const selectedState = this.location.states.filter(x => x.id == id);
  //   this.location.cities = selectedState[0].cities;
  // }

  // onCityChange(id) {
  //   if (!id || id == 0) {
  //     this.parameter.locality_id = '0';
  //     return false;
  //   }

  //   this.parameter.city_id = id;
  //   const selectedCountry = this.location.cities.filter(x => x.id == id);
  //   this.location.localities = selectedCountry[0].localities;
  // }

  // onLocalityChange(id) {
  //   if (!id || id == 0) {
  //     return false;
  //   }
  //   this.parameter.locality_id = id;
  //   // let selectedLocation = this.location.localities.filter(x=>x.id == id);
  //   // this.location.locality = selectedLocation[0];
  // }

  onCountryChange(id) {
    this.parameter.country_id = id;
    this.location.states = []; this.parameter.state_id = '0';
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id === '0') {
      this.parameter.state_id = '0';
      return false;
    }
    this.parameter.country_id = id;
    const selectedCountry = this.location.countries.filter(x => x.id.toString() === id);
    this.location.states = selectedCountry[0].states;

  }

  onStateChange(id) {
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id === '0') {
      this.parameter.city_id = '0';
      return false;
    }
    this.parameter.state_id = id;
    const selectedState = this.location.states.filter(x => x.id.toString() === id);
    this.location.cities = selectedState[0].cities;
  }

  onCityChange(id) {
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id === '0') {
      this.parameter.locality_id = '0';
      return false;
    }
    this.parameter.city_id = id;
    const selectedCountry = this.location.cities.filter(x => x.id.toString() === id);
    this.location.localities = selectedCountry[0].localities;
  }

  onLocalityChange(id) {
    if (!id || id === '0') {
      return false;
    }
    this.parameter.locality_id = id;
  }

  changeFlag(flag) {
    this.parameter.dash_flag = flag;
    if (flag.toString() === '5') {
      return false;
    }
    this.resetDates();
    this.getListing();
  }

  toggleAndSort(sort_by, sort_by_order) {
    if (this[sort_by_order] == 1) {
      this[sort_by_order] = 2;
    } else {
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
    this.admin.postDataApi('blockProject', { building_id: item.id, flag: 1 }).subscribe(r => {
      swal('Success', 'Project blocked successfully.', 'success');
    },
      error => {
        swal('Error', error.error.message, 'error');
      });
  }

  unblock(item) {
    item.is_blocked = false;
    this.admin.postDataApi('blockProject', { building_id: item.id, flag: 0 }).subscribe(r => {
      swal('Success', 'Project unblocked successfully.', 'success');
    },
      error => {
        swal('Error', error.error.message, 'error');
      });
  }

  approveProject(item, status) {
    if (item.is_completed !== 1) {
      swal('Error', 'You cannot approve the building as some of details are missing.', 'error');
      return false;
    }
    item.status = status;
    this.admin.postDataApi('approveProject', { building_id: item.id }).subscribe(r => {
      swal('Success', 'Project approved successfully.', 'success');
    },
      error => {
        swal('Error', error.error.message, 'error');
      });
  }

  rejectProject(status) {
    this.items[this.parameter.index].status = status;
    this.admin.postDataApi('rejectProject', { building_id: this.parameter.building_id, reason: this.reason }).subscribe(r => {
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

  resetFilters() {
    this.location.countries = JSON.parse(JSON.stringify(this.location.countries));
    this.onCountryChange('0');
    this.parameter.is_selected = false;
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = 2;
    this.parameter.total = 0;
    // this.selectedUser = '';
    this.parameter.keyword = '';
    this.parameter.count_flag = 1;
    this.resetDates();
    this.getListing();
  }

  resetDates() {
    this.parameter.min = '';
    this.parameter.max = '';
  }

  deletePopup(item: any, index: number) {
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    this.parameter.text = 'You want to delete this project?';

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteProject(item, index);
      }
    });
  }

  deleteProject(item: any, index: number) {
    this.admin.postDataApi('deleteProject',
    { building_id: item.id }).subscribe(r => {
      swal('Success', 'Deleted successfully.', 'success');
      this.items.splice(index, 1);
    },
    error => {
      swal('Error', error.error.message, 'error');
    });
  }
}
