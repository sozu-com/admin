import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Constant } from './../../../common/constants';
import { IProperty } from './../../../common/property';

@Component({
  selector: 'app-viewed-property',
  templateUrl: './viewed-property.component.html',
  styleUrls: ['./viewed-property.component.css']
})
export class ViewedPropertyComponent implements OnInit {

  @Input('viewed_properties') viewed_properties;
  @ViewChild('showPropertyModal') showPropertyModal: ElementRef;

  public parameter: IProperty = {};
  constructor(public constant: Constant) { }

  ngOnInit() {
    console.log('ip', this.viewed_properties);
  }

  viewProperties(data) {
    this.parameter.viewed_properties = data;
    this.showPropertyModal.nativeElement.click();
  }
}
