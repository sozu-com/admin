export class Company {
    id: number;
    name: string;
    person_in_charge: string;   // incharge of company
    rfc: string;    // legal id => unique company id
    razon_social: string;   // legal company name
    country_code: string;
    dial_code: string;
    phone: string;
    image: any;
    logo: any;
    email: string;
    address: string;
    lat?: any;
    lng?: any;
    branch?: string;
    branch_lat?: any;
    branch_lng?: any;
    page?: number;
    country_id?: string;
    state_id?: string;
    city_id?: string;
    locality_id?: string;
    description?: string;
    managers_count?: number;
}

export class Manager {
    id: string;
    company?: Company;
    name: string;
    country_code: string;
    dial_code: string;
    phone: string;
    image: any;
    logo: any;
    email: string;
}
