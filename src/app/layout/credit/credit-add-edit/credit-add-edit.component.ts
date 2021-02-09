import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-credit-add-edit',
  templateUrl: './credit-add-edit.component.html',
  styleUrls: ['./credit-add-edit.component.css']
})
export class CreditAddEditComponent implements OnInit {

  constructor( private spinner: NgxSpinnerService,) { }

  ngOnInit() {
    this.getListing();
    this.spinner.hide();
  }
  getListing() {
  //  this.spinner.show();
  }
}
