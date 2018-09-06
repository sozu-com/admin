import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-viewed-property',
  templateUrl: './viewed-property.component.html',
  styleUrls: ['./viewed-property.component.css']
})
export class ViewedPropertyComponent implements OnInit {

  @Input('property') property;

  constructor() { }

  ngOnInit() {
    console.log('ip', this.property);
  }
}
