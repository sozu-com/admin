import { UserModel } from "./inhouse-users.model";
import { LegalEntity, Banks, LegalRepresentative, Docs } from "./legalEntity.model";

export class Users {
    id: string;
    company_name?: string;
    name: string;
    first_surname?: string;
    second_surname?: string;
    country_code: string;
    dial_code: string;
    phone: string;
    image: any;
    img_loader: boolean;
    developer_image?: any;      // cover image of dev
    email: string;
    interested_in: string;
    user_type: string;
    address: string;
    selected: any;
    ocupation?: any;
    is_developer?: string;
    have_dev_panel_access?: number;
    send_mail?: number;
    developer_company?: string;
    developer_desc?: string;
    developer_address?: string;
    legal_address?: string;
    lat?: any;
    lng?: any;
    branch_office?: string;
    branch_lat?: any;
    branch_lng?: any;
    page?: number;
    buildings_sort?: number;
    legal_entities_sort?: number;
    images?: Array<any>;
    videos?: Array<string>;
    country_id?: number;
    state_id?: number;
    city_id?: number;
    locality_id?: string;
    fed_tax_pay?: string;
    developer_url?: string;
    legal_rep_banks?: Array<Banks>;
    beneficiary?: Array<Beneficiaries>;
    user_linked_documents?: Array<Docs>;
    legal_representative?: LegalRepresentative;
    gender?: string;
    dob?: string;
    curp?: string;
    nationality?: string;
    marital_statuses_id?: number;
    destination_id?: number;
    street_address?: string;
    external_number?: number;
    internal_number?: number;
    municipality?: string;
    zipcode?: number;
    neighborhood?: string;
    admin: UserModel;
    country_name?: string;
    state_name?: string;
    city_name?: string;
    neighbourhoods?: any[];
    country?: string;
    state?: string;
    city?: string;
    // for tax addresses
    tax_street_address?: string;
    tax_external_number?: number;
    tax_internal_number?: string;
    tax_zipcode?: number;
    tax_municipality?: string;
    tax_country?: string;
    tax_state?: string;
    tax_city?: string;
    tax_neighbourhood?: string;
    tax_neighbourhoods?: any[];
    use_user_same_address: boolean = false;
    nationality_name?: string;
    nationality_id?: number = 1;
}
export class Beneficiaries {
    id?: number;
    beneficiary_name: string;
    beneficiary_firstSurname: string;
    beneficiary_secondSurname: string;
    beneficiary_relationship: string;
    beneficiary_dob: string;
    beneficiary_percentage: string;
    beneficiary_address: string;
    beneficiary_phone: string;
    beneficiary_email: string;
    user?: Users;
    user_id?: number;
    user_type?: any;
    tutor?: Tutor;
}
export class Tutor {
    beneficiary_id?: number;
    tutor_name: string;
    tutor_firstSurname: string;
    tutor_secondSurname: string;
    tutor_relationship: string;
    tutor_dob: string;
    tutor_address: string;
    tutor_phone: string;
    tutor_email: string;
}