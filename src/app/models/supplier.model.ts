export class Supplier {
    id: string;
    comm_name: string;
    legal_name: string;
    email: string;
    country_code: string;
    dial_code: string;
    phone: string;
    description?: string;

    address: string;
    fed_tax_pay: string;
    lat?: any;
    lng?: any;
    send_mail?: number;
    suppliers_banks: Array<Banks>;
    suppliers_linked_documents?: Array<Doc>;

    neighbourhoods?: any[];
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

export class Banks {
    id: string;
    bank_name: string;
    swift: string;
    account_number: string;
    currency_id: number;
}
export class Docs {
    id: string;
    document_link: string;
    user_document_id: string;
    user_document?: userDoc;
}
export class Doc {
    id: string;
    document_link: string;
    legal_entity_document_id: string;
    legalentity_document?: legalentityDoc;
}
export class legalentityDoc {
    id: string;
    name_en: string;
    name_es: string;
}
export class userDoc {
    id: string;
    name_en: string;
    name_es: string;
}
