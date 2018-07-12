import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../common/property';

@Component({
  selector: 'app-data-collector',
  templateUrl: './data-collector.component.html',
  styleUrls: ['./data-collector.component.css']
})

export class DataCollectorComponent implements OnInit {
  public parameter: IProperty = {};
  constructor(private admin: AdminService, private router: Router, private swal: SweetAlertService) { 
    this.getDataCollectors()
  }

  ngOnInit() {
    this.parameter.total = 0;
  }

  getDataCollectors(){
    this.parameter.loading = true;
    this.parameter.url = 'getDataCollectors';
    let input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getDataCollectors',success)
          this.parameter.loading = false;
          this.parameter.items = success.data
          this.parameter.total = success.data.length;
        },
        error => {
          console.log(error)
          this.parameter.loading = false;
          if(error.statusCode==401) this.router.navigate(['']);
          else
            this.swal.warning({ 
              // title: 'Internet Connection',
              text: error.messages,
            })
        });
  }
}
