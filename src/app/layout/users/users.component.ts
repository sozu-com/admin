import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../common/property';
import { Users } from './../../models/users.model';
import { NgForm } from '@angular/forms';
import { Constant } from './../../common/constants';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [Users, Constant]
})
export class UsersComponent implements OnInit {

  public parameter: IProperty = {};
  constructor(private constant: Constant, private model: Users, private element: ElementRef, private route: ActivatedRoute, private admin: AdminService, private router: Router, private swal: SweetAlertService) { }

  ngOnInit() {
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.model.id = '';
    this.getBuyers();
  }

  getBuyers(){
    this.parameter.loading = true;

    this.parameter.url = `getBuyers`;
    // 'getBuyers' + '?page=' + this.parameter.p;
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getBuyers', success);
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


  getSellers(){
    this.parameter.loading = true;

    this.parameter.url = `getSellers`;
    // 'getBuyers' + '?page=' + this.parameter.p;
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getSellers', success);
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
