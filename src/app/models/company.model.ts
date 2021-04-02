import { LegalRepresentative } from './legalEntity.model';

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

export class Manager {
    id: number;
    company?: Company;
    name: string;
    first_surname?: string;
    second_surname?: string;
    country_code: string;
    dial_code: string;
    phone: string;
    image: any;
    logo: any;
    email: string;
    note: string;
    img_loader: boolean;
    logo_loader: boolean;
    project_sort: any;
    description?: string;
    address?: string;   // address string
    lat?: any;
    lng?: any;
    rfc_legal_id?: string;
    is_company?: string;
    company_id?: number;
    selected?: any;
    manager_notes?: Array<Note>;
}
export class Note {
    id: string;
    description: string;
    date: string;
    tower_managers_id: string;
}