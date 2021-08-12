import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'
import { IProperty } from 'src/app/common/property'
import { AdminService } from 'src/app/services/admin.service'
import { Constant } from 'src/app/common/constants'
import { PropertyService } from 'src/app/services/property.service'
import jspdf from 'jspdf'
import html2canvas from 'html2canvas'
import { forkJoin } from 'rxjs'
import { AngularFireAuth } from '@angular/fire/auth'

declare var jsPDF: any

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent implements OnInit {
  public parameter: IProperty = {}
  property: any
  marital_statuses: any
  amenities_string: any
  parking_count = 0
  bedrooms: any = [
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' },
    { name: '5+' },
  ]
  bathrooms: any = [
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' },
    { name: '5+' },
  ]
  halfBathrooms: any = [
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' },
    { name: '5+' },
  ]

  familySizes: any = [
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' },
    { name: '5+' },
  ]

  carsArray: any = [
    { name: 'No car' },
    { name: '1 car' },
    { name: '2 cars' },
    { name: '2+' },
  ]

  floorPlanImage: any
  coverImage: any
  isShow: boolean = true
  galleryImage : any;
  image360 : any;
  constructor(
    public admin: AdminService,
    private route: ActivatedRoute,
    public constant: Constant,
    private propertyService: PropertyService,
    private router: Router,private spinner: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.property = this.propertyService.property
    this.route.params.subscribe((params) => {
      this.getPropertyDetails(params.property_id)
    })
  }
  getPropertyDetails(property_id: string) {
    let self = this
    this.spinner.show();
    this.admin
      .postDataApi('getPropertyById', { property_id: property_id })
      .subscribe(
        (success) => {
          this.spinner.show();
          this.property = success.data
          //coverImage
          if (this.property.configuration_toggle == 0) {
            this.admin
              .postDataApi('getCoverImage', {
                image: (this.property || {}).image,
              })
              .subscribe((response: any) => {
                this.spinner.hide()
                this.coverImage = 'data:image/jpeg;base64,' + response.data
              })
          }else{
            this.admin
            .postDataApi('getCoverImage', {
              image: (this.property.building_configuration || {}).cover_profile,
            })
            .subscribe((response: any) => {
              this.spinner.hide()
              this.coverImage = 'data:image/jpeg;base64,' + response.data
            })
          }
          //floorplan image
          if (this.property.configuration_toggle == 0) {
            this.admin
              .postDataApi('getCoverImage', {
                image: (this.property || {}).floor_plan,
              })
              .subscribe((response: any) => {
                this.spinner.hide()
                this.floorPlanImage = 'data:image/jpeg;base64,' + response.data
              })
          }else{
            this.admin
            .postDataApi('getCoverImage', {
              image: (this.property.building_configuration || {}).floor_map_image,
            })
            .subscribe((response: any) => {
              this.spinner.hide()
              this.floorPlanImage = 'data:image/jpeg;base64,' + response.data
            })
          }
          //images
          if (this.property.configuration_toggle == 0) {
            (this.property || {}).images.forEach(x => {
              this.admin.postDataApi('getCoverImage', {image: x.image })
              .subscribe(success => {
               const con = 'data:image/jpeg;base64,' + success.data;
               x['image'] = con;
              },error => {});
             });
          }else{
            (this.property.building_configuration || {}).images.forEach(x => {
              this.admin.postDataApi('getCoverImage', {image: x.image })
              .subscribe(success => {
               const con = 'data:image/jpeg;base64,' + success.data;
               x['image'] = con;
              },error => {});
             });
          }

          //images 360
          if (this.property.configuration_toggle == 0) {
            this.admin
            .postDataApi('getCoverImage', {
              image: (this.property || {}).images360[0].image,
            })
            .subscribe((response: any) => {
              this.spinner.hide()
              this.image360 = 'data:image/jpeg;base64,' + response.data
            })
          }else {
            this.admin
            .postDataApi('getCoverImage', {
              image: (this.property.building_configuration || {}).images360[0].image,
            })
            .subscribe((response: any) => {
              this.spinner.hide()
              this.image360 = 'data:image/jpeg;base64,' + response.data
            })
          }

          if (
            this.property.property_parking_space &&
            this.property.property_parking_space.length > 0
          ) {
            this.property.property_parking_space.forEach((item) => {
              self.parking_count = self.parking_count + item.parking_count
            })
          }
          this.amenities_string = this.property.amenities
            .map((r) => {
              return r.name
            })
            .join(',')
          this.marital_statuses = this.property.marital_statuses
            .map((r) => {
              return r.name
            })
            .join(', ')
        },
        (error) => {
          this.spinner.hide()
        },
      )
  }


  downloadPDF() {
    this.spinner.show()
    //this.isShow = false
    setTimeout(() => {
      var data = document.getElementById('contentToConvert') //Id of the table
      html2canvas(data).then((canvas) => {
       // this.isShow = true
        // Few necessary setting options
        let imgWidth = 208
        let pageHeight = 295
        let imgHeight = (canvas.height * imgWidth) / canvas.width
        let heightLeft = imgHeight

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'mm', 'a4') // A4 size page of PDF
        let position = 0
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save('property-details.pdf') // Generated PDF
        this.spinner.hide()
      })
    }, 500)
  }

  goBack = (isForBack: boolean): void => {
    if (isForBack) {
      this.router.navigate(['/dashboard/properties/view-properties', { for: 'back' }]);
    } else {
      this.router.navigate(['/dashboard/properties/view-properties']);
    }
  }
}
