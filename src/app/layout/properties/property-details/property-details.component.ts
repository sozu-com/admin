import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
import { ActivatedRoute} from '@angular/router';
import { IProperty } from './../../../common/property';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  property: any;
  constructor(public admin: AdminService, private route: ActivatedRoute) { }

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
    this.admin.generalApi('user/getPropertyById', {property_id: property_id})
      .subscribe(success => {
        this.property = success.data;
        console.log('getPropertyById', this.property);
      });
  }
}
