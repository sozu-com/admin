import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../common/property';
import { InhouseUsers } from './../../models/inhouse-users.model';
import { NgForm } from '@angular/forms';
import { Constant } from './../../common/constants';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [InhouseUsers, Constant]
})
export class UsersComponent implements OnInit {

  public parameter: IProperty = {};
  constructor(private constant: Constant, private model: InhouseUsers, private element: ElementRef, private route: ActivatedRoute, private admin: AdminService, private router: Router, private swal: SweetAlertService) { }

  ngOnInit() {
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.getInhouseUsers();
  }

  getInhouseUsers(){
    this.parameter.loading = true;
console.log('this.parameter.userType', this.parameter.userType);
    switch (this.parameter.userType) {
      case 'data-collectors':
      this.parameter.url = 'getDataCollectors';
        break;

      case 'csr-sellers':
      this.parameter.url = 'getCsrSellers';
        break;

      case 'csr-buyers':
      this.parameter.url = 'getCsrBuyers';
        break;

      case 'inhouse-broker':
      this.parameter.url = 'getInhouseBroker';
        break;

      case 'csr-closers':
      this.parameter.url = 'getCsrClosers';
        break;

      default:
      this.parameter.url = 'getDataCollectors';
        break;
    }

    this.parameter.url = this.parameter.url + '?page=' + this.parameter.p;
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getInhouseBroker', success);
          this.parameter.loading = false;
          this.parameter.items = success.data;
          this.parameter.total = success.data.length;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode == 401) this.router.navigate(['']);
          else
            this.swal.warning({
              // title: 'Internet Connection',
              text: error.messages,
            });
        });
  }

}
