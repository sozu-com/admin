import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Constant } from './../../../common/constants';
import { IProperty } from './../../../common/property';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-project-block',
  templateUrl: './project-block.component.html',
  styleUrls: ['./project-block.component.css']
})
export class ProjectBlockComponent implements OnInit {

  buildingId: string;
  @Input('data') data: any;
  @Input('index') index: number;
  @Output('setBuilding') setBuilding = new EventEmitter();
  public parameter: IProperty = {};
  constructor(public constant: Constant, private admin: AdminService) { }

  ngOnInit() {
    this.parameter.page = this.constant.p;
  }


  setBuildingId(data: any) {
    console.log('aaaaaa');
    this.setBuilding.emit(data);
    console.log('1', data);
  }
}
