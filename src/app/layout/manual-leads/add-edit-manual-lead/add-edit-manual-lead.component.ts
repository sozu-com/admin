import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/common/constants';

@Component({
  selector: 'app-add-edit-manual-lead',
  templateUrl: './add-edit-manual-lead.component.html',
  styleUrls: ['./add-edit-manual-lead.component.css']
})
export class AddEditManualLeadComponent implements OnInit {

  constructor(
    public constant: Constant
  ) { }

  ngOnInit() {
  }

}
