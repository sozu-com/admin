import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { Constant } from 'src/app/common/constants';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  public parameter: IProperty = {};
  property: any;
  constructor(public admin: AdminService, private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    public constant: Constant,
    private propertyService: PropertyService,private router: Router,) { }

  ngOnInit() {
    this.property = this.propertyService.property;
    this.route.params.subscribe( params => {
      this.getPropertyDetails(params.property_id);
    });
    // this.cs.propertyDetailsData$.subscribe(res => {
    //   this.data = res;
    // });
  }
  goBack(){ 
    this.router.navigate(['/dashboard/properties/view-properties', {for: 'back'}])
  }
  getPropertyDetails(property_id: string) {
    // this.spinner.show();
    this.admin.postDataApi('getPropertyById', {property_id: property_id})
      .subscribe(success => {
        this.spinner.hide();
        this.property = success.data;
      }, error => {
        this.spinner.hide();
      });
  }
}
