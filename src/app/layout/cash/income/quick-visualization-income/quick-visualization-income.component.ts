import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { IProperty } from 'src/app/common/property';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrencyPipe } from '@angular/common';
import { ApiConstants } from 'src/app/common/api-constants';
import { Constant } from 'src/app/common/constants';
import { Income } from 'src/app/models/income.model';
declare let swal: any;

@Component({
  selector: 'app-quick-visualization-income',
  templateUrl: './quick-visualization-income.component.html',
  styleUrls: ['./quick-visualization-income.component.css'],
  providers: [Income, CurrencyPipe]
})
export class QuickVisualizationIncomeComponent implements OnInit {
  language_code: string;
  public parameter: IProperty = {}; property_collection_id: string;
  item: any;
  constructor(
    private route: ActivatedRoute,
    public constant: Constant,
    public model: Income,
    public apiConstants: ApiConstants,
    public admin: AdminService, private spinner: NgxSpinnerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.language_code = localStorage.getItem('language_code');
    this.parameter.sub = this.route.params.subscribe(params => {
      this.property_collection_id = params['id'];
      this.getCollectionDetails();
    });
  }


  getCollectionDetails() {
    let self = this;
    this.spinner.show();
    this.admin.postDataApi('viewIncomeById', { id: this.property_collection_id })
      .subscribe(
        success => {
          this.spinner.hide();
          this.item = success['data'];
          this.item['collection_payment_choice'] = this.item.collection_payment_choice;
          this.item['property_collection'] = this.item['collection_payment_choice'].property_collection;
          this.item['buyer'] = this.item['property_collection'].buyer;
          this.item['property'] = this.item['property_collection'].property;
          this.item['building'] = this.item['property'].building;
        })
  }

  goBack() {
    this.router.navigate(['/dashboard/cash/income', { for: 'back' }]);
  }
}
