import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quick-visualization-commission',
  templateUrl: './quick-visualization-commission.component.html',
  styleUrls: ['./quick-visualization-commission.component.css']
})
export class QuickVisualizationCommissionComponent implements OnInit {
  property_collection_id: any;
  i: any;
  citySelection = false;
  constructor() { }

  ngOnInit() {
    this.citySelection = false;
  }

}
