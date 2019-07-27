
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
import { Building, Property } from './../../../models/global.model';
import { MapsAPILoader } from '@agm/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from './../../../lang/translate.service';
import { IProperty } from '../../../common/property';
import { Constant } from '../../../common/constants';
import { NgxSpinnerService } from 'ngx-spinner';
declare let swal: any;
declare const google;

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  public parameter: IProperty = {};
  properties: Array<Property>;
  project: Building;
  id: any;
  config_string: any;
  configurations: any;
  configuration: any;
  carpet_area_string: any;
  base_price_string: string;
  base_price_min: number;
  base_price_max: number;
  bankLimit = 3;
  bankClicked = false;
  active = 'active';
  @ViewChild('mapListing') mapListing: ElementRef;

  constructor(
    private loader: MapsAPILoader,
    private admin: AdminService,
    private route: ActivatedRoute,
    public ts: TranslateService,
    public constant: Constant,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['project_id'];
      this.getListing();
    });
  }


  getListing() {
    this.spinner.show();
    this.admin.postDataApi('getProjectDetail', { project_id: this.id }).subscribe(res => {
      this.spinner.hide();
      this.project = res['data'].building;
      this.properties = res['data'].properties;
      this.configurations = this.project.configurations;
      this.configuration = this.configurations[0];
      this.config_string = this.project.configurations.map(r => r.config.name).join(', ');

      const config_carpet_areas = this.project.configurations.map(r => parseInt(r.carpet_area));
      if (config_carpet_areas.length < 1) {
        this.carpet_area_string = 'Not Available';
      } else if (config_carpet_areas.length === 1) {
        this.carpet_area_string = config_carpet_areas[0] + ' sqmt';
      } else {
        const min = Math.min.apply(null, config_carpet_areas);
        const max = Math.max.apply(null, config_carpet_areas);
        this.carpet_area_string = min + ' sqmt - ' + max + ' sqmt';
      }

      const config_prices = this.project.configurations.map(r => parseInt(r.base_price));
      if (config_prices.length < 1) {
        this.base_price_string = 'Not Available';
      } else if (config_prices.length === 1) {
        this.base_price_min = config_prices[0];
      } else {
        this.base_price_min = Math.min.apply(null, config_prices);
        this.base_price_max = Math.max.apply(null, config_prices);

      }
      this.initMapLocations();
    }, error => {
      this.spinner.hide();
    });
  }

  initMapLocations() {
    this.loader.load().then(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const map = new google.maps.Map(this.mapListing.nativeElement, {
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            zoom: 15
          });

          const infowindow = new google.maps.InfoWindow();
          let marker, i;

          marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.project.lat, this.project.lng),
            map: map
          });

          google.maps.event.addListener(marker, 'click', ((marker, i) => {
            return () => {
              infowindow.setContent('<p>' + this.project.name + '</p>');
              infowindow.open(map, marker);
            };
          })(marker, i));

          map.setCenter(marker.position);

        });
      }
    });
  }
}
