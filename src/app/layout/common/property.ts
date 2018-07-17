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
  countries?: any;
  states?: any;
  cities?: any;
  localities?: any;
  country_id?: string;
  state_id?: string;
  city_id?: string;
  locality_id?: string;
  countryCount?: number;
  stateCount?: number;
  cityCount?: number;
  localityCount?: number;
  countriesAdd?: any;
  statesAdd?: any;
  citiesAdd?: any;
  localitiesAdd?: any;
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
  amenitiesCount?: number;
  projectTypes?: any;
  projectTypesCount?: number;
  routeName?: string;
  icon?: any;
  userType?: string;
  overlay?: any;
}
