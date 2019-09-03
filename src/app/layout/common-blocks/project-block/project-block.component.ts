import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-project-block',
  templateUrl: './project-block.component.html',
  styleUrls: ['./project-block.component.css']
})
export class ProjectBlockComponent implements OnInit {

  @Input('data') data: any;
  @Input('index') index: number;
  @Output('setBuilding') setBuilding = new EventEmitter();
  @Output('buildingIndex') buildingIndex = new EventEmitter();
  constructor(public constant: Constant, private admin: AdminService) { }

  ngOnInit() {}

  setBuildingId(data: any, i: number) {
    // data.selected = true;
    this.setBuilding.emit(data);
    this.buildingIndex.emit(i);
  }
}
