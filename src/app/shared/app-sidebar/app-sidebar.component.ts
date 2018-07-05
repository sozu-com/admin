import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.css']
})

export class AppSidebarComponent implements OnInit {

    constructor(private admin: AdminService, private router: Router, private swal: SweetAlertService) { }

    ngOnInit() {
    }

    isActive = false;
    showMenu = '';
    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    onLoggedout(){
        let self=this;
        this.swal.confirm({ 
            title: 'Are you sure?',
            text: 'You want to log-out?',
        }).then(function(){
        self.logout();
        })
        .catch(function(){
        // console.log('Logout cancelled by user');
        })
    }


    logout(){
        localStorage.removeItem('accessToken');
        localStorage.removeItem('isLoggedin');
        this.admin.unsetUserLoggedIn();
        this.router.navigate(['']);
    }


    getProducts(userId){
        this.router.navigate(['/dashboard/view-product', userId]);
    }
}
