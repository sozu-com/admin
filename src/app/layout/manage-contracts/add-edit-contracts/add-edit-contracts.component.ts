import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-contracts',
  templateUrl: './add-edit-contracts.component.html',
  styleUrls: ['./add-edit-contracts.component.css']
})
export class AddEditContractsComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  goBack = (isForBack: boolean): void => {
    if (isForBack) {
      this.router.navigate(['dashboard/manage-contracts/view-all', { for: 'back' }]);
    } else {
      this.router.navigate(['dashboard/manage-contracts/view-all']);
    }
  }

}
