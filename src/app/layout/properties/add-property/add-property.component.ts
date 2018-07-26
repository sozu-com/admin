import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})

export class AddPropertyComponent implements OnInit {

  tab: number;
  constructor() { }

  ngOnInit() {
    this.tab = 1;
  }

  setTab(tab){
    this.tab = tab;
  }
}
