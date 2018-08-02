import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { IProperty } from '../../../common/property';
// import { SweetAlertService } from 'ngx-sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { AddProjectModel } from './../../../models/addProject.model';
import { NgForm } from '@angular/forms';
declare let swal: any;

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [AddProjectModel]
})
export class AddProjectComponent implements OnInit {
  public parameter: IProperty = {};
  url: any[];
  tab: number;
  selectedGuest;
  image1;
  image2;
  image3;
  showBuilding = false;
  amenityList = [];
  amen = '';
  bankList = [];
  bank = '';
  testMarital = [];

  constructor(
    private model: AddProjectModel,
    private admin: AdminService,
    private router: Router,
    private sanitization: DomSanitizer) {

    }

  ngOnInit() {

  }
}
