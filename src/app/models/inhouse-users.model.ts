import { Agency } from './agency.model';
import { LegalRepresentative } from './legalEntity.model';
export class InhouseUsers {

    public address = [
        {
            countries: '',
            states : '',
            cities: '',
            localities: '',
            buildings: ''
        }
    ];

    public userModel = {
        id: '',
        name: '',
        first_surname: '',
    second_surname: '',
        country_code: 'mx',
        dial_code: '+52',
        phone: '',
        image: '',
        email: '',
        address: this.address,
        is_broker_seller_dev: false,
        is_buyer_renter: false,
        is_broker: false,
        is_data_collector: false,
        is_csr_closer: false
    };
}

export class UserModel {
    id: string;
    img_loader: boolean;
    logo_loader: boolean;
    logo: any;
    description?: string;
    addresss?: string;   // address string
    lat?: any;
    lng?: any;
    rfc_legal_id?: string;
    is_company?: string;
    company_id?: number;
    selected?: any;
    agency_id?: any;
    name: string;
    first_surname?: string;
    second_surname?: string;
    country_code: string;
    dial_code: string;
    phone: string;
    image: string;
    email: string;
    address: Array<NewAddress>;
    is_broker_seller_dev: boolean;
    is_buyer_renter: boolean;
    is_broker: boolean;
    is_data_collector: boolean;
    is_csr_closer: boolean;
    is_csr_renter: boolean;
    is_collection_agent: boolean;
    is_credit_agent: boolean;
    // keys added for external broker
    is_external_agent?: boolean;
    agency?: Agency;
    company?:Company;
    is_inhouse_agent?: boolean; // for frontend use only
    // company_name?: string;
    // company_logo?: string;
    //description?: string;
    adr?: string;   // address string
   // lat?: any;
  //  lng?: any;
    // branches?: Array<Branches>;
    // branch_office?: string;
    // branch_lat?: any;
    // branch_lng?: any;
    // company_images?: Array<any>;
    // company_videos?: Array<any>;
    // rfc_legal_id?: string;
    // is_company?: string;
}

export class Company {
    id: any;
    person_in_charge: string;   // incharge of company
    rfc: string;    // legal id => unique company id
    razon_social: string;   // legal company name
    name: string;
    country_code: string;
    dial_code: string;
    phone: string;
    image: any;
    logo: any;
    img_loader: boolean;
    logo_loader: boolean;
    email: string;
    address: string;
    lat?: any;
    lng?: any;
    branch?: string;
    branch_lat?: any;
    branch_lng?: any;
    page?: number;
    description?: string;
    managers_count?: number;
    project_count?: number;
    sort_manager?: number;
    project_sort?: number;
    legal_representative?: LegalRepresentative;
}

export class Branches {
    address: string;
    lat: string;
    lng: string;
}
export class Notes {
    note: string;
    title : string;
    agent_id : any;
}


export class User {
    name: '';
    first_surname?: string;
    second_surname?: string;
    country_code: 'mx';
    dial_code: '+52';
    phone: '';
    image: '';
    email: '';
    is_broker_seller_dev: false;
    is_buyer_renter: false;
    is_broker: false;
    is_data_collector: false;
    is_csr_closer: false;
}

export class Address {
    address: [
        {
            countries: '',
            states: '',
            cities: '',
            localities: '',
            buildings: ''
        }
    ];
}

export class NewAddress {
    countries: string;
    states: string;
    cities: string;
    localities: string;
    buildings: string;
}
