import { City } from './location.model';
import { Manager, Company } from './company.model';
import { Agency } from './agency.model';
import { LegalEntity } from './legalEntity.model';

export class CarpetAreas {
  carpet_areas: Array<object> = [
    {
      area: 0,
      price: 0
    }
  ];
}

export class AddProjectModel {

  id = '';
  building_id = '';
  country_id = '';
  state_id = '';
  city_id = '';
  locality_id = '';
  name = '';
  for_rent = false;
  for_sale = true;
  floors: any = '';
  address = '';
  avg_price = '';
  cover_image: File;
  images: any = [];
  images360: any = [];
  videos: any = [];
  amenvideos: any = [];
  allAmenvideos: any = [];
  building_images: any = [];
  description = '';
  amenities = [];
  lat: any = '';
  lng: any = '';
  custom_attributes = [];
  custom_values = [];
  configurations = [];
  // configurations: Array<Configuration>;
  // Preferable buyers
  pets = 1;
  kids_friendly = 1;
  students_friendly = 1;
  lgtb_friendly = 1;
  mature_people_friendly = 1;
  marital_status: any = [1];

  developer = {
    id: '',
    name: '',
    email: '',
    country_code: '',
    dial_code: '',
    phone: '',
    logo: '',
    image: '',
    developer_image: '',
    developer_company: '',
    developer_desc: ''
  };
  developer_id: any;
  dev_countrycode: any = '';
  dev_dialcode: any = '';
  dev_email: any = '';
  dev_phone: any = '';
  dev_name: any = '';
  dev_logo: any = '';

  building_age = '';
  building_type = '';
  building_type_id: any = '';
  possession_status_id: any = '';
  launch_date: any = '';
  main_image: any = '';
  document?: string;
  doc_loader?: boolean;
  is_completed: any;
  building_request_id: '';
    parking_space_lots?: Array<Parking>;
    parking_space_rent?: Array<Parking>;
    
  building_towers: Array<Towers>;
  property_offer_payment: Array<pay>;
  building_tower_edit_index: any;
  videoLoader: boolean;
  locality: LocalityToCountry;
  manager?: Manager;
  manager_id: number;
  company?: Company;
  company_id: number;
  agency?: Agency;
  //legal_entity?: LegalEntity;
  legal_entity?: Array<LegalEntity>;
  legal_entity_id?: number;
  agency_id?: number;
  selected?: boolean;
  policies?: string;
  maintenance_cost?: string;
  maintenance?: string;
  num_of_properties?: number;
  maintenance_cost_type?: number;
  project_logo?: any;
  // maintenance_cost_value?: number;
  developer_by: boolean = false;
  agency_by: boolean = false;
  managed_by: boolean = false;
  building_contributors_param: Array<contributors> = [];
  building_contributors: Array<contributorsParam> = [];
  legal_entity_info: any;
  total_square_meters: any;
}

export class AddOfficeModel {

  id = '';
  office_id = '';
  country_id = '';
  state_id = '';
  city_id = '';
  locality_id = '';
  name = '';
  for_rent = false;
  for_sale = true;
  floors: any = '';
  address = '';
  avg_price = '';
  cover_image: File;
  images: any = [];
  images360: any = [];
  videos: any = [];
  amenvideos: any = [];
  allAmenvideos: any = [];
  office_images: any = [];
  description = '';
  amenities = [];
  lat: any = '';
  lng: any = '';
  custom_attributes = [];
  custom_values = [];
  configurations = [];
  // configurations: Array<Configuration>;
  // Preferable buyers
  pets = 1;
  kids_friendly = 1;
  students_friendly = 1;
  lgtb_friendly = 1;
  mature_people_friendly = 1;
  marital_status: any = [1];

  developer = {
    id: '',
    name: '',
    email: '',
    country_code: '',
    dial_code: '',
    phone: '',
    logo: '',
    image: '',
    developer_image: '',
    developer_company: '',
    developer_desc: ''
  };
  developer_id: any;
  dev_countrycode: any = '';
  dev_dialcode: any = '';
  dev_email: any = '';
  dev_phone: any = '';
  dev_name: any = '';
  dev_logo: any = '';

  office_age = '';
  office_type = '';
  office_type_id: any = '';
  possession_status_id: any = '';
  launch_date: any = '';
  main_image: any = '';
  document?: string;
  doc_loader?: boolean;
  is_completed: any;
  office_request_id: '';
    parking_space_lots?: Array<Parking>;
    parking_space_rent?: Array<Parking>;
    
  office_towers: Array<Towers>;
  office_offer_payment: Array<pay>;
  office_tower_edit_index: any;
  videoLoader: boolean;
  locality: LocalityToCountry;
  manager?: Manager;
  manager_id: number;
  company?: Company;
  company_id: number;
  agency?: Agency;
  //legal_entity?: LegalEntity;
  legal_entity?: Array<LegalEntity>;
  legal_entity_id?: number;
  agency_id?: number;
  selected?: boolean;
  policies?: string;
  maintenance_cost?: string;
  maintenance?: string;
  num_of_properties?: number;
  maintenance_cost_type?: number;
  office_logo?: any;
  // maintenance_cost_value?: number;
  developer_by: boolean = false;
  agency_by: boolean = false;
  managed_by: boolean = false;
  office_contributors_param: Array<contributors> = [];
  office_contributors: Array<officeContributorsParam> = [];
  legal_entity_info: any;
  total_square_meters: any;
}

export class Parking {
  id: string;
  parking_space_id: number;
  no_parking: string;
  is_parking: boolean = false;
}

export class Configuration {
  base_price: any = '';
  building_id: any = '';
  carpet_area: any = '';
  config: any = {
    created_at: '',
    created_by: '',
    id: '',
    name: '',
    name_en: '',
    name_es: '',
    bedroom: 0,
    bathroom: 0,
    half_bathroom: 0,
    status: '',
    updated_at: ''
  };
  configuration_id: any = '';
  building_configuration_id: any = '';
  created_at: any = '';
  created_by: any = '';
  floor_map_image: any = '';
  id: any = '';
  other_images: any = [];
  images_files: any = [];
  images_path: any = [];
  images: any = [];
  images360: any = [];
  videos: any = [];
  updated_at: any = '';
  name: any = '';
  cover_profile:any='';
}

export class Towers {
  id?: string;
  building_id?: string;
  tower_name: string;
  num_of_floors?: number;
  unique_floors?: Array<any>;
  possession_status_id?: string;
  launch_date?: string;
  amenities?: Array<AmenitiesShowObj>;
  amenitiesId?: Array<string>;
  floor_array?: Array<number>;
  amenitiesCount?: number;
  num_of_properties?: number;
  floors?: Array<any>;
  total_square_meters: any;
  // amenities: Array<any>;
  // amenitiesId: Array<any>;
}
export class pay {
  id?: string;
  building_id?: string;
  final_price: string;
}

export class AmenitiesShowObj {
  id: string;
  name_en: string;
  name_es: string;
  icon: string;
  name: string;
  selected: boolean;
  images: Array<string>;
  images_360: Array<string>;
  videos: Array<string>;
}

export class LocalityToCountry {
  id: any;
  name_es: string;
  name_en: string;
  status: any;
  city_id: any;
  poly_coordinates: any;
  price_per_sqft: any;
  city: City;
}

export class contributorsParam {
  users_id: number;
  user_type: number;
  building_id: number;
}

export class officeContributorsParam {
  users_id: number;
  user_type: number;
  office_id: number;
}

export class contributors {
  id: number;
  name: string;
  phone: string;
  email: string;
}
