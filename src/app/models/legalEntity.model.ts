export class LegalEntity {
    id: string;
    comm_name: string;
    legal_name: string;
    country_code: string;
    dial_code: string;
    phone: string;
    address: string;
    fed_tax_pay: string;
    lat?: any;
    lng?: any;
    description?: string;
    send_mail?: number;
    legal_entity_banks: Array<Banks>;
    entity_linked_documents?: Array<Doc>;
    legal_rep: LegalRepresentative;
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
export class LegalRepresentative {
    id?: string;
    name: string;
    first_surname?: string;
    second_surname?: string;
    dial_code: string;
    country_code: string;
    phone: string;
    email: string;
    fed_tax_pay: string;
    have_dev_panel_access?: number;
    legal_rep_banks: Array<Banks>;
    building_ids?: Array<any>;
    sales_commission?: number;
}
