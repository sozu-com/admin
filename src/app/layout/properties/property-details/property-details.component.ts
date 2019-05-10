import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
import { ActivatedRoute} from '@angular/router';
import { IProperty } from './../../../common/property';
import { Constant } from '../../../common/constants';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  public parameter: IProperty = {};
  property: any;
  constructor(public admin: AdminService, private route: ActivatedRoute, public constant: Constant) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.getPropertyDetails(params.property_id);
    });
    // this.cs.propertyDetailsData$.subscribe(res => {
    //   console.log('ress', res);
    //   this.data = res;
    // });
  }

  getPropertyDetails(property_id) {
    this.parameter.loading = true;
    this.admin.postDataApi('getPropertyById', {property_id: property_id})
      .subscribe(success => {
        this.parameter.loading = false;
        this.property = success.data;
      }, error => {
        this.parameter.loading = false;
      });
  }
}
