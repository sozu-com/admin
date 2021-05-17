
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
  public base64address:any;
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
this.base64address = "data:image/jpeg;base64,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";

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
        this.carpet_area_string = this.commasPipe.transform(this.project.min_carpet_area || 0) + ' mts2';
      } else {
        this.carpet_area_string = this.commasPipe.transform(this.project.min_carpet_area || 0) + ' mts2 - ' +
        this.commasPipe.transform(this.project.max_carpet_area || 0) + ' mts2';
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

      // if (this.project.images360.length > 0) {
      //   setTimeout(r => {
          
      //   }, 2000);
      // }


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

    downloadPDF(){
    var data = document.getElementById('contentToConvert');  //Id of the table
      html2canvas(data).then(canvas => {  
        // Few necessary setting options  
        // let imgWidth = 208;   
        // let pageHeight = 5000;    
        // let imgHeight = canvas.height * imgWidth / canvas.width;  
        // let heightLeft = imgHeight;  
  
        // const contentDataURL = canvas.toDataURL('image/png')  
        // let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
        // let position = 0;  
        // pdf.addImage(contentDataURL + contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
        // pdf.save('project-details.pdf'); // Generated PDF 
        
        var imgData = canvas.toDataURL('image/png');

        /*
        Here are the numbers (paper width and height) that I found to work. 
        It still creates a little overlap part between the pages, but good enough for me.
        if you can find an official number from jsPDF, use them.
        */
        var imgWidth = 210; 
        var pageHeight = 260; //295;  
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
  
        var doc = new jspdf('p', 'mm');
        var position = 0;
  
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.save('project-details.pdf'); // Generated PDF 
      });
  }
}
