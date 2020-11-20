import { LegalEntity, Banks, LegalRepresentative } from "./legalEntity.model";

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
    country_id?: string;
    state_id?: string;
    city_id?: string;
    locality_id?: string;
    fed_tax_pay?: string;
    developer_url?: string;
    legal_rep_banks?: Array<Banks>;
    legal_representative?: LegalRepresentative;
}
