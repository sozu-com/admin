export class Company {
    id: number;
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
    img_loader: boolean;
    logo_loader: boolean;
}
