export class Agency {
    id: string;
    person_in_charge: string;   // incharge of company
    rfc: string;    // legal id => unique company id
    razon_social: string;   // legal company name
    name: string;   // commercial name
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
    branch_office?: string;
    branch_lat?: any;
    branch_lng?: any;
    page?: number;
    description?: string;
    agents_count?: number;
    property_count?: number;
    property_sort?: number;     // for sorting
    agent_sort?: number;     // for sorting
}
