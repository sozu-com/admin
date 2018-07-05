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
  countries?: any;
  states?: any;
  cities?: any;
  name_es?: string;
  name_en?: string;
  country_id?: string;
  state_id?: string;
  city_id?:string;
}
