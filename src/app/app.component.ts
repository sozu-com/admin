import { Component, OnInit } from '@angular/core';
import { IProperty } from './common/property';
import { Router, NavigationEnd, NavigationCancel, NavigationError, NavigationStart } from '@angular/router';
import { HttpInterceptor } from './services/http-interceptor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public parameter: IProperty = {};
  loading: any = false;
  constructor(private router: Router, public interceptor: HttpInterceptor) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // this.parameter.loading = true;
      }
      if (event instanceof NavigationEnd) {
        // this.parameter.loading = false;
        window.scrollTo(0, 0);
      }
      if (event instanceof NavigationCancel) {
        // this.parameter.loading = false;
      }
      if (event instanceof NavigationError) {
        // this.parameter.loading = false;
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
}
