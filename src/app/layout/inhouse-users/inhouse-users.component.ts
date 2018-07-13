import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../common/property';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-inhouse-users',
  templateUrl: './inhouse-users.component.html',
  styleUrls: ['./inhouse-users.component.css']
})

export class InhouseUsersComponent implements OnInit {

  public parameter: IProperty = {};
  public modalRef: BsModalRef;
  constructor(private element: ElementRef, private route: ActivatedRoute, private modalService: BsModalService, private admin: AdminService, private router: Router, private swal: SweetAlertService) { 
   
  }
  ngOnInit() {
    this.parameter.routeName = this.router.url;
console.log('xx',this.router.url)
    
  }

  public openUserModal(template: TemplateRef<any>) {
    console.log('zz', template);
    // this.project.possession.id = id;
    // this.project.possession.name_en = name_en;
    // this.project.possession.name_es = name_es==null? name_en : name_es;
    // this.project.possession.status = status;
    this.modalRef = this.modalService.show(template);
  }

  changeListner(event) {
    var reader = new FileReader();
    
    var image = this.element.nativeElement.querySelector('.image');

    var fileToUpload = event.target.files[0];
    this.parameter.icon = fileToUpload;

    reader.onload = function(e) {
      console.log(image)
      var src = e.target['result'];
        image.src = src;
        console.log(image.src)
    };

    reader.readAsDataURL(event.target.files[0]);
  }
}
