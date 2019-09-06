import { Injectable } from '@angular/core';
import { AddPropertyModel } from '../models/addProperty.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  property: any;
  constructor() { }

  setPropertyData(data: AddPropertyModel) {
    this.property = data;
  }
}
