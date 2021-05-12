
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Property, Building } from 'src/app/models/global.model';
import { AdminService } from 'src/app/services/admin.service';
import { Constant } from 'src/app/common/constants';
import { TranslateService } from '@ngx-translate/core';
import jspdf from 'jspdf';  
import html2canvas from 'html2canvas';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NumberWithCommasPipe } from 'src/app/pipes/number-with-commas.pipe';

declare let swal: any;
declare const google;
declare var jsPDF:any;


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  providers: [Building,NumberWithCommasPipe]
})
export class ProjectDetailsComponent implements OnInit {
  // public parameter: IProperty = {};
  // properties: Array<Property>;
  // project: Building;
  // id: any;
  // config_string: any;
  // configurations: any;
  // configuration: any;
  // carpet_area_string: any;
  // base_price_string: string;
  // base_price_min: number;
  // base_price_max: number;
  // bankLimit = 3;
  // bankClicked = false;
  // active = 'active';
  // @ViewChild('mapListing') mapListing: ElementRef;

  // constructor(
  //   private loader: MapsAPILoader,
  //   private admin: AdminService,
  //   private route: ActivatedRoute,
  //   public constant: Constant,
  //   private spinner: NgxSpinnerService,
  //   private translate: TranslateService,private router: Router, 
  // ) { }

  // ngOnInit() {
  //   this.route.params.subscribe(params => {
  //     this.id = params['project_id'];
  //     this.getListing();
  //   });
  // }


  // getListing() {
  //   this.spinner.show();
  //   this.admin.postDataApi('getProjectDetail', { project_id: this.id }).subscribe(res => {
  //     this.spinner.hide();
  //     this.project = res['data'].building;
  //     this.properties = res['data'].properties;
  //     this.project.units = 0;
  //     this.project.building_towers.forEach(bt => {
  //       this.project.units = bt.num_of_properties + this.project.units;
  //     });
  //     this.configurations = this.project.configurations;
  //     this.configuration = this.configurations[0];
  //     this.config_string = this.project.configurations.map(r => r.name ? r.name : r.config.name).join(', ');

  //     const config_carpet_areas = this.project.configurations.map(r => parseInt(r.carpet_area));
  //     if (config_carpet_areas.length < 1) {
  //       this.carpet_area_string = this.translate.instant('addForm.notAvailable');
  //     } else if (config_carpet_areas.length === 1) {
  //       this.carpet_area_string = config_carpet_areas[0] + ' ' + this.translate.instant('addForm.sqmt');
  //     } else {
  //       const min = Math.min.apply(null, config_carpet_areas);
  //       const max = Math.max.apply(null, config_carpet_areas);
  //       this.carpet_area_string = min + ' ' + this.translate.instant('addForm.sqmt') +
  //       ' - ' + max + ' ' + this.translate.instant('addForm.sqmt');
  //     }

  //     const config_prices = this.project.configurations.map(r => parseInt(r.base_price));
  //     if (config_prices.length < 1) {
  //       this.base_price_string = this.translate.instant('addForm.notAvailable');
  //     } else if (config_prices.length === 1) {
  //       this.base_price_min = config_prices[0];
  //     } else {
  //       this.base_price_min = Math.min.apply(null, config_prices);
  //       this.base_price_max = Math.max.apply(null, config_prices);

  //     }
  //     this.initMapLocations();
  //   }, error => {
  //     this.spinner.hide();
  //   });
  // }

  // initMapLocations() {
  //   this.loader.load().then(() => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(position => {
  //         const map = new google.maps.Map(this.mapListing.nativeElement, {
  //           center: {
  //             lat: position.coords.latitude,
  //             lng: position.coords.longitude
  //           },
  //           zoom: 15
  //         });

  //         const infowindow = new google.maps.InfoWindow();
  //         let marker, i;

  //         marker = new google.maps.Marker({
  //           position: new google.maps.LatLng(this.project.lat, this.project.lng),
  //           map: map
  //         });

  //         google.maps.event.addListener(marker, 'click', ((marker, i) => {
  //           return () => {
  //             infowindow.setContent('<p>' + this.project.name + '</p>');
  //             infowindow.open(map, marker);
  //           };
  //         })(marker, i));

  //         map.setCenter(marker.position);

  //       });
  //     }
  //   });
  // }
  // goBack(){ 
  //   this.router.navigate(['/dashboard/projects/view-projects', {for: 'back'}])
  // }

  // downloadPDF(){
  //   var data = document.getElementById('contentToConvert');  //Id of the table
  //     html2canvas(data).then(canvas => {  
  //       // Few necessary setting options  
  //       let imgWidth = 208;   
  //       let pageHeight = 295;    
  //       let imgHeight = canvas.height * imgWidth / canvas.width;  
  //       let heightLeft = imgHeight;  
  
  //       const contentDataURL = canvas.toDataURL('image/png')  
  //       let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
  //       let position = 0;  
  //       pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
  //       pdf.save('project-details.pdf'); // Generated PDF   
  //     });
  // }

  viewer: any;
  PSV: any;
  //myform: FormGroup;
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
  loadingListing= true;
  public language_code: string;
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
    private admin: AdminService,
  ) { }

  ngOnInit() {
    this.language_code = localStorage.getItem('language_code');
    //this.inItContactForm();
    //this.loggedIn = this.as.loggedIn;
    // this.route.params.subscribe(params => {
    //   const index = params.id.lastIndexOf('_');
    //   this.id = params.id.slice(index + 1);
    //   this.getListing();
    // });

       this.route.params.subscribe(params => {
      this.id = params['project_id'];
      this.getListing();
    });

    // this.loginData$$ = this.as.loginData$.subscribe(r => {
    //   this.loginData = r;
    //   if (r.country_code) {
    //     this.country_code = r.country_code;
    //   }
    //   this.myform.patchValue(this.loginData);
    // });


  }


  getListing() {
    this.loadingListing = true;
    this.admin.postDataApi('getProjectDetails', { project_id: this.id }).subscribe(r => {
      this.project = r['data'].building;
      this.loadingListing = false;
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
        this.carpet_area_string = this.commasPipe.transform(this.project.min_carpet_area) + ' mts2';
      } else {
        this.carpet_area_string = this.commasPipe.transform(this.project.min_carpet_area) + ' mts2 - ' +
        this.commasPipe.transform(this.project.max_carpet_area) + ' mts2';
      }

      const config_prices = this.project.configurations.map(r => {
        return parseInt(r.base_price); });
      if (config_prices.length < 1) {
        this.base_price_string = 'Not Available';
      } else if (config_prices.length === 1) {
        this.base_price_min = config_prices[0];
      } else {
        this.base_price_min = Math.min.apply(null, config_prices);
        this.base_price_max = Math.max.apply(null, config_prices);
      }
     // this.cs.setMetaForProject(this.project);
      this.initMapLocations();

      if (this.project.images360.length > 0) {
        setTimeout(r => {
          
        }, 2000);
      }


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
          var marker, i;

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


  // inItContactForm() {
  //   this.myform = new FormGroup({
  //     name: new FormControl('', [
  //       Validators.required
  //     ]),
  //     email: new FormControl('', [
  //       Validators.required,
  //       Validators.pattern('[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$')
  //     ]),
  //     phone: new FormControl('', [
  //       Validators.required,
  //       Validators.pattern('^[0-9]{5,15}$')
  //     ]),
  //     password: new FormControl('', [
  //       Validators.minLength(8),
  //       Validators.required
  //     ]),
  //     property_interested: new FormControl('1 BHK', Validators.required),
  //     register_user: new FormControl('', Validators.required),
  //     schedule_appointment: new FormControl('', Validators.required),
  //     appointment_date: new FormControl('', Validators.required),
  //     agreement: new FormControl('', Validators.required)
  //   });
  // }


  // contact() {

  //   if (this.myform.controls.name.invalid) {
  //     swal('Oops...', 'Please enter name', 'warning'); return false;
  //   }
  //   if (!this.myform.controls.phone.value) {
  //     swal('Oops...', 'Please enter phone number', 'warning'); return false;
  //   }
  //   if (this.myform.controls.phone.invalid) {
  //     swal('Oops...', 'Phone number must be 5-15 digits', 'warning'); return false;
  //   }
  //   if (!this.myform.controls.email.value) {
  //     swal('Oops...', 'Please enter email', 'warning'); return false;
  //   }
  //   if (this.myform.controls.email.invalid) {
  //     swal('Oops...', 'Please enter a valid email', 'warning'); return false;
  //   }
  //   if (this.myform.controls.schedule_appointment.value && !this.myform.controls.appointment_date.value) {
  //     swal('Oops...', 'Please enter date and time', 'warning'); return false;
  //   }
  //   if (this.myform.controls.register_user.value && !this.myform.controls.password.value) {
  //     swal('Oops...', 'Please enter password', 'warning'); return false;
  //   }
  //   if (this.myform.controls.register_user.value && this.myform.controls.password.invalid) {
  //     swal('Oops...', 'Password length must be a tleast 8 characters long', 'warning'); return false;
  //   }

  //   if (this.myform.controls.register_user.value && this.myform.controls.agreement.value != true) {
  //     swal('Oops...', 'Please accept terms of service and privacy policy', 'warning'); return false;
  //   }

  //   const data = this.myform.getRawValue();
  //   data.id = this.loginData.id;
  //   data.country_code = this.country_code;
  //   data.dial_code = '+' + this.dial_code;
  //   data.property_for = this.property_for;
  //   data.building_id = this.id;
  //   data.appointment_date = moment(data.appointment_date).utc().format('YYYY-MM-DD H:m:s');
  //   if (!data.schedule_appointment) {
  //     delete data.appointment_date;
  //   }
  //   this.as.contactCumRegister(data);
  // }


  onCountryChange(obj) {
    this.country_code = obj.iso2;
    this.dial_code = obj.dialCode;
  }

  // updateSchema(building) {
  //   this.schema = {
  //     '@context': 'http://schema.org/',
  //     '@type': 'SingleFamilyResidence',
  //     'name': building.name,
  //     'image': building.image,
  //     'url': environment.site_url + this.cs.makeProjectPath(building),
  //     'address': {
  //       '@type': 'PostalAddress',
  //       'name': building.address
  //     },
  //     'geo': {
  //       '@type': 'GeoCoordinates',
  //       'latitude': building.lat,
  //       'longitude': building.lng,
  //       'address': building.address
  //     }
  //   };
  // }


  // initPhotoSphereViewer() {
  //   const viewer = document.querySelector('#viewer');
  //   const img = this.sanitizer.bypassSecurityTrustUrl('http://localhost/360.jpg');
  //   this.PSV = new PhotoSphereViewer({
  //     panorama: 'http://localhost/360.jpg',
  //     container: viewer,
  //     time_anim: false,
  //     navbar: true,
  //     size: {
  //       width: '100%',
  //       height: '300px'
  //     }
  //   });
  //   const icons = document.createElement('UL');
  //   icons.className += 'pointerIcons';
  //   this.project.images360.forEach((item, index) => {
  //     const li = document.createElement('LI');
  //     li.style.backgroundImage = item.image;
  //     li.addEventListener('click', () => {
  //       this.PSV.setPanorama(item.image, null, true);
  //     });
  //     icons.appendChild(li);
  //   });
  //   document.querySelector('#viewer-wrapper').appendChild(icons);
  // }

  // viewAmenities(am) {
  //   const initialState: any = {};
  //   initialState.amenities = [am.pivot];
  //   initialState.label = am.name;
  //   this.bsModalRef = this.modalService.show(BlockAmenitiesComponent, { initialState: initialState, class: 'modal-lg' });
  //   this.openModal(initialState);
  // }

  // viewProjectPhotos(images, images_360, videos) {
  //   const initialState: any = {};
  //   const amenities = [{
  //     'images': images,
  //     'images_360': images_360,
  //     'videos': videos
  //   }];
  //   initialState.amenities = amenities;
  //   initialState.label = this.ts.lang.Gallery;
  //   this.bsModalRef = this.modalService.show(BlockAmenitiesComponent, { initialState: initialState, class: 'modal-lg' });
  //   this.openModal(initialState);
  // }

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


  // view360Img(img: string) {
  //   const initialState: any = {};
  //   initialState.amenities = [img];
  //   this.bsModalRef = this.modalService.show(BlockImg360ViewerComponent, { initialState: initialState, class: 'modal-lg' });
  //   this.openModal(initialState);
  // }

  // viewVideo (video: string) {
  //   const initialState: any = {};
  //   initialState.amenities = [video];
  //   this.bsModalRef = this.modalService.show(BlockVideoViewerComponent, { initialState: initialState, class: 'modal-lg' });
  //   this.openModal(initialState);
  // }
  // tooglePath1(value) {
  //   console.log(value,"buildingod")
  //     this.router.navigate(['/pro-properties',value]);
  // }

  // gotoHome(){
  //   this.router.navigate(['/']);
  // }
}
