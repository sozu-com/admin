import { Injectable } from '@angular/core';
import { Leads, Prefs, SelectedProperties } from '../models/leads.model';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  // flag
  buyerLeadsFlag: number;
  inhouseAgentLeadsFlag: number;
  outsideAgentLeadsFlag: number;
  closureLeadsFlag: number;
  sellerLeadsFlag: number;
  dataCollectorLeadsFlag: number;
  notaryLeadsFlag: number;
  bankLeadsFlag: number;

  // count flag
  buyerLeadsCountFlag: number;
  inhouseAgentLeadsCountFlag: number;
  outsideAgentLeadsCountFlag: number;
  closureLeadsCountFlag: number;
  sellerLeadsCountFlag: number;
  dataCollectorLeadsCountFlag: number;
  notaryLeadsCountFlag: number;
  bankLeadsCountFlag: number;

  leadData: Leads;

  constructor() {}

  setLeadDetailData(data: Leads) {
    this.leadData = data;
    this.leadData.prefs = new Prefs();
    this.leadData.selected_properties = [new SelectedProperties()];
  }
}
