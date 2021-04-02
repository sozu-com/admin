import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-property-configuration',
  templateUrl: './property-configuration.component.html',
  styleUrls: ['./property-configuration.component.css']
})
export class PropertyConfigurationComponent implements OnInit {

  @Input('configuration') configuration;

  constructor() { }

  ngOnInit() {
  }

}
