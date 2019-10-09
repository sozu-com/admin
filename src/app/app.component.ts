import { Component, OnInit } from '@angular/core';
import { IProperty } from './common/property';
import { Router, NavigationEnd, NavigationCancel, NavigationError, NavigationStart } from '@angular/router';
import { HttpInterceptor } from './services/http-interceptor';
import { PlatformLocation } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { VersionCheckService } from './services/version-check.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

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
    private versionCheckService: VersionCheckService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService) {

    // translate
    this.translate.setDefaultLang('en');

    // close popup if any opened
    location.onPopState(() => {
      $('.close').click();
      // this.spinner.hide();
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
    this.versionCheckService.initVersionCheck(environment.versionCheckURL);
    this.interceptor.loaderValue$.subscribe(res => {
      setTimeout(() => {
        this.loading = Object.keys(res).length !== 0 ? res['value'] : false;
      }, 0);
    });
  }

}
