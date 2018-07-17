import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../common/property';

@Component({
  selector: 'app-csr-closer',
  templateUrl: './csr-closer.component.html',
  styleUrls: ['./csr-closer.component.css']
})
export class CsrCloserComponent implements OnInit {
  public parameter: IProperty = {};
  
  constructor(private admin: AdminService, private router: Router, private swal: SweetAlertService) { 
    this.getCsrClosers()
  }

  ngOnInit() {
    this.parameter.total = 0;
  }


  getCsrClosers(){
    this.parameter.loading = true;
    this.parameter.url = 'getCsrClosers';
    let input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getCsrClosers',success)
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
