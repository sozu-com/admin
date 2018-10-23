// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-project-details',
//   templateUrl: './project-details.component.html',
//   styleUrls: ['./project-details.component.css']
// })
// export class ProjectDetailsComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from './../../../services/admin.service';
import { Building , Property} from './../../../models/global.model';
import { MapsAPILoader } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';

declare let swal: any;
declare const google;
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  myform: FormGroup;
  country_code = 'mx';
  dial_code = '52';
  schema: any;
  properties: Array<Property>;
  project: Building;
  currentKeywords: any;
  city: any;
  locality: any;
  id: any;
  config_string: any;
  configurations: any;
  configuration: any;
  loginData: any;
  loggedIn: any;
  carpet_area_string: any;
  base_price_string: string;
  base_price_min: number;
  base_price_max: number;
  bankLimit = 3;
  bankClicked = false;

  @ViewChild('mapListing') mapListing: ElementRef;

  constructor(
    private loader: MapsAPILoader,
    private admin: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // this.loggedIn = this.as.loggedIn;
    this.route.params.subscribe( params => {
      const index = params.id.lastIndexOf('_');
      this.id = params.id.slice(index + 1);
      this.getListing();
    });

    // this.as.loginData$.subscribe(r => {
    //   this.loginData = r;
    //   this.country_code = r.country_code;
    //   this.myform.patchValue(this.loginData);
    // });


  }


  getListing(){
    //this.currentKeywords.city_id = this.city.id;
    this.admin.postDataApi('/user/getProjectProperties', {project_id: this.id}).subscribe(r => {
      console.log(r);
      this.project = r['data'].building;
      this.properties = r['data'].properties;
      this.configurations =  this.project.configurations;
      this.configuration = this.configurations[0];
      this.config_string = this.project.configurations.map(r => r.config.name).join(', ');

      const config_carpet_areas = this.project.configurations.map(r => parseInt(r.carpet_area));
      if (config_carpet_areas.length < 1){
        this.carpet_area_string = 'Not Available';
      }else if (config_carpet_areas.length == 1){
        this.carpet_area_string = config_carpet_areas[0] + ' sqft';
      }else{
        const min = Math.min.apply(null, config_carpet_areas);
        const max = Math.max.apply(null, config_carpet_areas);
        this.carpet_area_string = min + ' sqft - ' + max + ' sqft';
      }

      const config_prices = this.project.configurations.map(r => parseInt(r.base_price));
      if (config_prices.length < 1){
        this.base_price_string = 'Not Available';
      }else if (config_prices.length == 1){
        this.base_price_min = config_prices[0];
      }else{
        this.base_price_min = Math.min.apply(null, config_prices);
        this.base_price_max = Math.max.apply(null, config_prices);

      }
      // this.cs.setMetaForProject(this.project);
      this.initMapLocations();
    });

  }

  initMapLocations(){
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
