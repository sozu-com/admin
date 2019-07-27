import { Component, OnInit } from '@angular/core';
import { IProperty } from './common/property';
import { Router, NavigationEnd, NavigationCancel, NavigationError, NavigationStart } from '@angular/router';
import { HttpInterceptor } from './services/http-interceptor';
import { PlatformLocation } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public parameter: IProperty = {};
  loading: any = false;
  constructor(private router: Router, private location: PlatformLocation,
    public interceptor: HttpInterceptor,
    private spinner: NgxSpinnerService) {

    // close popup if any opened
    location.onPopState(() => {
      $('.close').click();
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.spinner.show();
      }
      if (event instanceof NavigationEnd) {
        this.spinner.hide();
        window.scrollTo(0, 0);
      }
      if (event instanceof NavigationCancel) {
        this.spinner.hide();
      }
      if (event instanceof NavigationError) {
        this.spinner.hide();
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
