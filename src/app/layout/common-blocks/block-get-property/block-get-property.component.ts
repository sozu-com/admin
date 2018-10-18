import { Component, OnInit , ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { Constant } from '../../../common/constants';
import { AdminService } from '../../../services/admin.service';
import { IProperty } from '../../../common/property';

@Component({
  selector: 'app-block-get-property',
  templateUrl: './block-get-property.component.html',
  styleUrls: ['./block-get-property.component.css']
})
export class BlockGetPropertyComponent implements OnInit {

  @ViewChild('showPropertyWithSearchModal') showPropertyWithSearchModal: ElementRef;
  @ViewChild('hidePropertyWithSearchModal') hidePropertyWithSearchModal: ElementRef;

  @Output() itemSelect = new EventEmitter();

  parameter: IProperty = {};
  location: IProperty= {};
  items: any = [];
  loading = false;

  constructor(
    private admin: AdminService,
    public constant: Constant
  ) { }

  ngOnInit() {
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.getCountries();
    this.getListing();
  }

  getListing() {
    this.loading = true;
    this.admin.postDataApi('propertySearch', this.parameter).subscribe(r => {
      console.log(r);
      this.loading = false;
      this.items = r['data'];
      this.parameter.total = r['total'];

    },
    error => {
      this.loading = false;
      this.parameter.total = 0;
    });
  }

  getPage(page) {
    this.parameter.page = page;
    this.getListing();
  }

  showModal() {
    this.showPropertyWithSearchModal.nativeElement.click();
  }

  getCountries() {
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      console.log(r);
      this.location.countries = r['data'];
    });
  }

  onCountryChange(id) {
    this.location.states = []; this.parameter.state_id = '0';
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    this.location.buildings = []; this.parameter.building_id = '0';
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
    this.location.buildings = []; this.parameter.building_id = '0';
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
    this.location.buildings = []; this.parameter.building_id = '0';
    if (!id || id === '0') {
      this.parameter.locality_id = '0';
      return false;
    }
    this.parameter.city_id = id;
    const selectedCountry = this.location.cities.filter(x => x.id.toString() === id);
    this.location.localities = selectedCountry[0].localities;
  }

  onLocalityChange(id) {
    this.location.buildings = []; this.parameter.building_id = '0';
    if (!id || id === 0) {
      this.parameter.building_id = '0';
      return false;
    }
    this.parameter.locality_id = id;
    const selectedCountry = this.location.localities.filter(x => x.id.toString() === id);
    this.location.buildings = selectedCountry[0].buildings;
  }

  onBuildingChange(id) {
    if (!id || id === '0') {
      return false;
    }
    this.parameter.building_id = id;
    this.getListing();
  }

  selectItem(item) {
    this.hidePropertyWithSearchModal.nativeElement.click();
    this.itemSelect.emit(item);
  }

}
