import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-block',
  templateUrl: './user-block.component.html',
  styleUrls: ['./user-block.component.css']
})
export class UserBlockComponent implements OnInit {
  @Input('data') data: any;
  @Input('index') index: number;
  @Output('setUser') setBuilding = new EventEmitter();
  @Output('UserIndex') buildingIndex = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  setUserId(data: any, i: number) {
    // data.selected = true;
    this.setBuilding.emit(data);
    this.buildingIndex.emit(i);
  }

}
