import { Component, OnInit } from '@angular/core';
import { IProperty } from './common/property';
import { Router, NavigationEnd, NavigationCancel, NavigationError, NavigationStart } from '@angular/router';
import { HttpInterceptor } from './services/http-interceptor';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public parameter: IProperty = {};
  loading: any = false;
  constructor(private router: Router, private admin: AdminService, public interceptor: HttpInterceptor) {

    // this.checkData().then(r => {
    //   console.log('checkkkkk----------------');
    //     // this.loading = false;
    // });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.parameter.loading = true;
      }
      if (event instanceof NavigationEnd) {
        this.parameter.loading = false;
        window.scrollTo(0, 0);
      }
      if (event instanceof NavigationCancel) {
        this.parameter.loading = false;
      }
      if (event instanceof NavigationError) {
        this.parameter.loading = false;
      }
    });
  }

  ngOnInit() {
    this.interceptor.loaderValue$.subscribe(res => {
      setTimeout(() => {
        this.loading = Object.keys(res).length !== 0 ? res['value'] : false;
      }, 0);
    });
  }


  // checkData(): Promise<any> {

  //   return new Promise(resolve => {
  //     this.admin.login.subscribe(success => {
  //       this.interceptor.loader.next({value: true});
  //       // console.log('outside', success);
  //       if (success['name'] === undefined) {
  //         this.interceptor.loader.next({value: true});
  //         // console.log('inside');
  //         this.admin.postDataApi('get-details', {})
  //         .subscribe(
  //           success1 => {
  //             this.interceptor.loader.next({value: true});
  //             // console.log('ssss1', success1);
  //             this.admin.login.next(success1.data);
  //             this.admin.permissions = success1.data.permissions ? success1.data.permissions : {};
  //             const aclData: any = {};
  //             const dd = success1.data.m.map((obj, index) => {
  //               const key =  Object.keys(obj)[0];
  //               this.admin.admin_acl[key] =  obj[key];
  //             });
  //             this.interceptor.loader.next({value: false});
  //             // console.log('111111');
  //             resolve();
  //             return true;
  //           });
  //       } else {
  //         // console.log('inside guard');
  //         resolve();
  //         return true;
  //       }
  //     });
  //   });
  // }
}
