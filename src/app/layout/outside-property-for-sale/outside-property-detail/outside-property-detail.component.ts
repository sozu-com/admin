
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Property, Building } from 'src/app/models/global.model';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NumberWithCommasPipe } from 'src/app/pipes/number-with-commas.pipe';
import { Location } from '@angular/common';

declare let swal: any;
declare const google;
declare var jsPDF: any;


@Component({
  selector: 'app-outside-property-detail',
  templateUrl: './outside-property-detail.component.html',
  styleUrls: ['./outside-property-detail.component.css'],
  providers: [Building, NumberWithCommasPipe]
})
export class OutsidePropertyDetailComponent implements OnInit {
  viewer: any;
  PSV: any;
  country_code = 'mx';
  dial_code = '52';
  schema: any;
  properties: Array<Property>;
  currentKeywords: any;
  city: any;
  locality: any;
  id: any;
  config_string: any;
  configurations: any;
  configuration: any;
  loginData: any;
  loginData$$: any;
  loggedIn: any;
  carpet_area_string: any;
  base_price_string: string;
  base_price_min: number;
  base_price_max: number;
  bankLimit = 3;
  bankClicked = false;
  property_for: any = 1;
  today = new Date();
  contactDeveloperForm = false;
  tab = 1;
  bsModalRef: BsModalRef;
  @ViewChild('mapListing') mapListing: ElementRef;
  loadingListing = true;
  public language_code: string;
  public base64address: any;
  main_image: any;
  galleryImageOne: any;
  galleryImagetwo: any;
  image_360: any;
  video_thumb: any;
  amenities_icon?: any = [];
  from: string;
  constructor(
    private loader: MapsAPILoader,
    // private us: UserService,
    // private as: AuthService,
    private cs: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    public ts: TranslateService,
    private sanitizer: DomSanitizer,
    private modalService: BsModalService,
    private commasPipe: NumberWithCommasPipe,
    public project: Building,
    private admin: AdminService, private spinner: NgxSpinnerService,
    private location: Location

  ) { }

  ngOnInit() {
    this.language_code = localStorage.getItem('language_code');
    this.route.params.subscribe(params => {
      this.id = params['property_id'];
      this.getListing();
    });
  }


  getListing() {
    this.loadingListing = true;
    this.spinner.show();
    this.admin.postDataApi('getProjectDetails', { project_id: this.id }).subscribe(r => {
      this.project = r['data'].building;
      this.loadingListing = false;
      //coverImage
      if ((this.project || {}).main_image) {
        this.admin
          .postDataApi('getCoverImage', {
            image: (this.project || {}).main_image,
          })
          .subscribe((response: any) => {
            this.main_image = 'data:image/jpeg;base64,' + response.data
          })
      }
      //images1
      if ((this.project || {}).images) {
        this.admin
          .postDataApi('getCoverImage', {
            image: this.project.images[0] ? this.project.images[0].image : []
          })
          .subscribe((response: any) => {
            this.galleryImageOne = 'data:image/jpeg;base64,' + response.data
          })
      }
      //images1
      if ((this.project || {}).images) {
        this.admin
          .postDataApi('getCoverImage', {
            image: this.project.images[1] ? this.project.images[1].image : [],
          })
          .subscribe((response: any) => {
            this.galleryImagetwo = 'data:image/jpeg;base64,' + response.data
          })
      }
      //images 360
      if ((this.project.images360 || [])) {
        // const input = this.project.images360[0].image ? this.project.images360[0].image : []
        this.admin.postDataApi('getCoverImage', { image: this.project.images360[0] ? this.project.images360[0].image : [] })
          .subscribe((abc: any) => {
            this.image_360 = 'data:image/jpeg;base64,' + abc.data;
          })
      }
      //video
      if ((this.project.videos || [])) {
        // const input = this.project.images360[0].image ? this.project.images360[0].image : [] this.project.videos[0].thumb
        this.admin.postDataApi('getCoverImage', { image: this.project.videos[0] ? this.project.videos[0].thumb : [] })
          .subscribe((abc: any) => {
            this.video_thumb = 'data:image/jpeg;base64,' + abc.data;
          })
      }
      //configuration
      if ((this.project || {}).configurations) {
        (this.project || {}).configurations.forEach(x => {
          this.admin.postDataApi('getCoverImage', { image: x.floor_map_image })
            .subscribe(success => {
              const con = 'data:image/jpeg;base64,' + success.data;
              x['configBase'] = con;
            }, error => { });
        });
      }
      //amenities
      if ((this.project || {}).amenities) {
        (this.project || {}).amenities.forEach(r => {
          this.admin.postDataApi('getCoverImage', { image: r.icon })
            .subscribe(success => {
              const mails = 'data:image/jpeg;base64,' + success.data;
              r['iconBase'] = mails;
            }, error => { });
        });
      }
      this.spinner.hide();
      this.project.total_rent = 0;
      this.project.total_sale = 0;
      this.project.units = 0;
      this.project.building_towers.forEach(bt => {
        this.project.units = bt.properties_total_count + this.project.units;
      });
      this.project.building_towers.forEach(bt => {
        this.project.total_sale = bt.sale_properties_count + this.project.total_sale;
      });
      this.project.building_towers.forEach(bt => {
        this.project.total_rent = bt.rent_properties_count + this.project.total_rent;
      });
      // this.updateSchema(this.project);
      this.properties = r['data'].properties;
      this.configurations = this.project.configurations;
      this.configuration = this.configurations[0];
      this.config_string = this.project.configurations.map(r => { return r.config.name; }).join(', ');


      if (this.project.configurations.length < 1) {
        this.carpet_area_string = 'Not Available';
      } else if (this.project.configurations.length === 1) {
        this.carpet_area_string = this.commasPipe.transform(this.project.min_carpet_area || 0) + ' mts2';
      } else {
        this.carpet_area_string = this.commasPipe.transform(this.project.min_carpet_area || 0) + ' mts2 - ' +
          this.commasPipe.transform(this.project.max_carpet_area || 0) + ' mts2';
      }

      const config_prices = this.project.configurations.map(r => {
        return parseInt(r.base_price);
      });
      if (config_prices.length < 1) {
        this.base_price_string = 'Not Available';
      } else if (config_prices.length === 1) {
        this.base_price_min = config_prices[0];
      } else {
        this.base_price_min = Math.min.apply(null, config_prices);
        this.base_price_max = Math.max.apply(null, config_prices);
      }
      this.initMapLocations();


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
            }
          })(marker, i));
          map.setCenter(marker.position);

        });
      }
    });
  }


  onCountryChange(obj) {
    this.country_code = obj.iso2;
    this.dial_code = obj.dialCode;
  }

  openModal(initialState) {
    const newSubscriber = this.modalService.onHide.subscribe(r => {
      newSubscriber.unsubscribe();
      // console.log('DATA', this.bsModalRef.content.data);
      const data = this.bsModalRef.content.data;
      if (data) {
        // console.log(this.bsModalRef.content.data);
      }
    });
  }

  ngOnDestroy() {
    if (this.loginData$$) {
      this.loginData$$.unsubscribe();
    }
  }


  downloadPDF() {
    this.spinner.show();
    var data = document.getElementById('contentToConvert');  //Id of the table
    html2canvas(data).then(canvas => {
      var imgData = canvas.toDataURL('image/png');
      var margin = 5;
      var imgWidth = 210;
      var pageHeight = 287; //295; 
      var imgHeight = canvas.height * imgWidth / canvas.width;
      console.log(imgHeight, "imgHeight")
      var heightLeft = imgHeight;

      var doc = new jspdf('p', 'mm');
      var position = 5;

      doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('project-details.pdf'); // Generated PDF 
      this.spinner.hide();
    });
  }

  goBack = (isForBack: boolean): void => {
    if (isForBack && this.from != 'buyerLead') {
      this.router.navigate(['/dashboard/outside-property-for-sale/outside', { for: 'back' }]);
    }
    else if (this.from == 'buyerLead') {
      this.location.back();
    }
    else {
      this.router.navigate(['/dashboard/outside-property-for-sale/outside']);
    }
  }
}
