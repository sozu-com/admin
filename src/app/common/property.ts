export interface IProperty {
  url?: string;
  loading?: boolean;                      // loader
  itemsPerPage?: number;                  // total items per page
  total?: number;                         // total records count
  p?: number;                             // page
  sizeLimit?: number;                     // file size limit --- 5000000 means 5MB
  title?: string;
  text?: string;
  items?: any[];
  sub?: any;
  isBlocked?: boolean;
  isDeleted?: boolean;
  isEmailVerified?: string;
  successMsg?: string;
  msg?: string;
  userId?: string;
  status?: number;
  userPlaceholder?: string;
  searchKey?: string;
  fullName?: string;
  email?: string;
  countryCode?: string;
  dialCode?: string;
  phoneNumber?: string;
  value?: Date;
  data?: any;
  name_es?: string;
  name_en?: string;
  states?: any;
  cities?: any;
  countries?: any;
  countries1?: any;
  countries2?: any;
  countries3?: any;
  countries4?: any;
  countries5?: any;
  states1?: any;
  states2?: any;
  states3?: any;
  cities1?: any;
  cities2?: any;
  localities?: any;
  buildings?: any;
  country_id?: string;
  state_id?: string;
  city_id?: string;
  locality_id?: string;
  building_id?: string;
  countryCount?: number;
  stateCount?: number;
  cityCount?: number;
  stateCityCount?: number;
  localityCount?: number;
  buildingCount?: number;
  countriesAdd?: any;
  statesAdd?: any;
  citiesAdd?: any;
  localitiesAdd?: any;
  buildingsAdd?: any;
  country_idAdd?: string;
  state_idAdd?: string;
  city_idAdd?: string;
  locality_idAdd?: string;
  countryCountAdd?: number;
  stateCountAdd?: number;
  cityCountAdd?: number;
  localityCountAdd?: number;
  successText?: string;
  propertyTypes?: any;
  propertyTypesCount?: number;
  amenities?: any;
  propertyDetails?: any;
  amenitiesCount?: number;
  projectTypes?: any;
  projectTypesCount?: number;
  routeName?: string;
  icon?: any;
  userType?: string;
  overlay?: any;
  is_broker_seller_dev?: number;
  is_buyer_renter?: number;
  is_broker?: number;
  is_data_collector?: number;
  image?: any;
  index?: number;
  name?: string;
  phone?: string;
  type?: number;
  property_id?: string;
  banks?: any;
  bankCount?: string;
  flag?: number;
  page?: number;

  admin_id?: any;
  id?: any;
  lead?: any;
  interested_properties?: any;
  conversation?: any;
  conversation_id?: number;
  message?: any;
  messages?: any;
  socket?: any;
  socket_id?: any;
  connected?: any;
  lead_id?: number;
  user_id?: number;
  adminType?: number;
  allCountry?: any;
  message_type?: number;
  sent_as?: number;
  proximity_places?: any;
  car_types?: any;
  prefs?: any;
  property_types?: any;
  configurations?: any;
  viewed_properties?: any;
  viewed_projects?: any;
  allDocuments?: any;
  subscriber?: any;
  favorites?: any;
  buildingSpecificTypes?: any;
  paymentStatuses?: any;
  keyword?: string;
  configuration_id?: number;
  address?: any;
  property_for?: any;
  dash_flag?: any;
  sort_by?: any;
  sort_by_order?: any;
  sort_by_flag?: any;
  count_flag?: any;
  seller_id?: any;
  noResultFound?: any;
  data_collector_id?: string;
  assignee_id?: string;
  min?: any;
  max?: any;
  lead_sort?: number;
  start_date?: any;
  end_date?: any;
  post_type?: any;
  year?: any;
  month?: any;
  is_selected?: boolean;
  location?: any;
  developer?: any;
  page2?: any;
  total2?: any;
}
