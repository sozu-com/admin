import { Component } from '@angular/core';
import { IProperty } from './layout/common/property';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  public parameter: IProperty = {};

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.parameter.loading = true;
      }
      if(event instanceof NavigationEnd) {
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
  
  ngOnInit() { }
}
