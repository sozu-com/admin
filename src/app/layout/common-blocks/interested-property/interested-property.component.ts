import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-interested-property',
  templateUrl: './interested-property.component.html',
  styleUrls: ['./interested-property.component.css']
})

export class InterestedPropertyComponent implements OnInit {
  @Input('ip') ip;

  constructor() { }

  ngOnInit() {
    console.log('ip', this.ip);
  }

}
