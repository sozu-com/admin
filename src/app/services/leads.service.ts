import { Injectable } from '@angular/core';
import { Leads, Prefs, SelectedProperties } from '../models/leads.model';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  constructor() { }

  leadData: Leads;
  setLeadDetailData(data: Leads) {
    this.leadData = data;
    this.leadData.prefs = new Prefs();
    this.leadData.selected_properties = [new SelectedProperties()];
  }
}
