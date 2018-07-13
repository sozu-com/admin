import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../common/property';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InhouseUsersComponent } from './../inhouse-users.component';

@Component({
  selector: 'app-data-collector',
  templateUrl: './data-collector.component.html',
  styleUrls: ['./data-collector.component.css'],
  providers: [InhouseUsersComponent]
})

export class DataCollectorComponent implements OnInit {
  public parameter: IProperty = {};
  public modalRef: BsModalRef;
  constructor(private userComponent: InhouseUsersComponent, private modalService: BsModalService, private admin: AdminService, private router: Router, private swal: SweetAlertService) { 
    this.getDataCollectors()
  }

  ngOnInit() {
    this.parameter.total = 0;
  }

  public openUserModal(template: TemplateRef<any>) {
    // this.project.possession.id = id;
    // this.project.possession.name_en = name_en;
    // this.project.possession.name_es = name_es==null? name_en : name_es;
    // this.project.possession.status = status;
    // this.modalRef = this.modalService.show(template);
    console.log('zxxx',template)
    this.userComponent.openUserModal(template);
  }

  getDataCollectors(){
    this.parameter.loading = true;
    this.parameter.url = 'getDataCollectors';
    let input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getDataCollectors',success)
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
