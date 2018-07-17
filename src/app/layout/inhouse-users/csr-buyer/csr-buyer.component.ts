import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../common/property';

@Component({
  selector: 'app-csr-buyer',
  templateUrl: './csr-buyer.component.html',
  styleUrls: ['./csr-buyer.component.css']
})
export class CsrBuyerComponent implements OnInit {
  public parameter: IProperty = {};
  
  constructor(private admin: AdminService, private router: Router, private swal: SweetAlertService) { 
    this.getCsrBuyers()
  }

  ngOnInit() {
    this.parameter.total = 0;
  }


  getCsrBuyers(){
    this.parameter.loading = true;
    this.parameter.url = 'getCsrBuyers';
    let input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getCsrBuyers',success)
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
