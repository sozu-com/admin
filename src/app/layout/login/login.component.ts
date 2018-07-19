import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { SweetAlertService } from 'ngx-sweetalert2';
import { NgForm } from '@angular/forms';
import { IProperty } from '../../common/property';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  model = {
    email: '',
    password: ''
  }

  public parameter: IProperty = {};
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  
  constructor(private router: Router, private admin: AdminService, private swal: SweetAlertService) { 
    this.parameter.loading= false;
  }

  @ViewChild('input1') input1: ElementRef;

  ngOnInit() {}
  
  ngAfterViewInit() {
    this.input1.nativeElement.focus();
  }
  
  loginUser(formData: NgForm) {
    this.parameter.loading = true;
  	var email = formData.value.email;
    var password = formData.value.password;
    
    this.admin.adminLogin(email, password)
      .subscribe(
        success => {
          console.log('---', success)
          this.admin.setUserLoggedIn();
          // this.router.navigate(['dashboard']);
          this.router.navigate(['dashboard/view-inhouse-users/data-collectors']);
          this.parameter.loading = false;
        },
        error => {
          console.log('---', error)
          this.parameter.loading = false;
          this.swal.error({ 
            title: 'Error',
            text: error.message,
          })
        });
  }
}
