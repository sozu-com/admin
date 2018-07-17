import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../common/property';

@Component({
  selector: 'app-inhouse-broker',
  templateUrl: './inhouse-broker.component.html',
  styleUrls: ['./inhouse-broker.component.css']
})
export class InhouseBrokerComponent implements OnInit {
  public parameter: IProperty = {};
  
  constructor(private admin: AdminService, private router: Router, private swal: SweetAlertService) { 
    this.getInhouseBroker()
  }

  ngOnInit() {
    this.parameter.total = 0;
  }


  getInhouseBroker(){
    this.parameter.loading = true;
    this.parameter.url = 'getInhouseBroker';
    let input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getInhouseBroker',success)
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
