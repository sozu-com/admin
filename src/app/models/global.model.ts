
export class Property {
  amenities?: any = [];
  area?: any;
  active?: any;
  bathroom?: any;
  bedroom?: any;
  building?: Building;
  building_id?: any;
  city?: any;
  city_id?: any;
  configuration?: any;
  configuration_id?: any;
  created_at?: any;
  created_by?: any;
  creator?: any;
  description?: any;
  expected_price_rent?: any;
  expected_price_sale?: any;
  favourite: any;
  floor?: any;
  for_rent?: any;
  for_sale?: any;
  id?: any;
  image?: any;
  images?: any;
  locality?: Locality;
  locality_id?: any;
  possesion_date?: any;
  property_type?: any;
  property_type_id?: any;
  quantity?: any;
  status?: any;
  step?: any;
  updated_at?: any;
  marital_statuses?: any;
}

export class Building {
  address?: any;
  banks?: any = [];
  admin_id?: any;
  city_id?: any;
  configurations?: any;
  amenities?: any;
  created_by?: any;
  developer?: Developer;
  id?: any;
  lat?: any;
  lng?: any;
  locality_id?: any;
  main_image?: any;
  name?: any = '';
  status?: any;
  user_developer?: any;
  data?: any;
  project?: any;
  avg_price?: any;
  units?: any;
  building_towers?: any[] = [];
  hotel_towers?: any[] = [];
  total_rent?: any;
  total_sale?: any;
  min_carpet_area?: number;
  max_carpet_area?: number;
  images360?: any[] = [];
  images?: any[] = [];
  videos?: any[] = [];
  amliy?: test;
  office_towers?: any[] = [];
}
export class test {
  ;
  id?: any;
  name?: any;
  name_en?: any;
  name_es?: any;
  icon?: any;
}
export class Locality {
  city_id?: any;
  active?: any;
  id?: any;
  name?: any;
  name_en?: any;
  name_es?: any;
  overlay?: any;
  poly_coordinates?: any;
  price_per_sqft?: any;
  status?: any;
  description?: any;
  data?: any;
}

export class Developer {
  assigned_csr_buyer_id?: any;
  assigned_csr_seller_id?: any;
  buildings_count?: any;
  country_code?: any;
  created_at?: any;
  developer_desc?: any;
  developer_image?: any;
  developer_title?: any;
  developer_url?: any;
  email?: any;
  id?: any;
  image?: any;
  is_blocked?: any;
  is_buyer?: any;
  is_email_verified?: any;
  is_phone_verified?: any;
  is_seller?: any;
  name?: any = '';
  phone?: any;
  seller_type?: any;
  updated_at?: any;
  data?: any;
}
