export class LegalEntity {
    id: string;
    comm_name: string;
    legal_name: string;
    country_code: string;
    dial_code: string;
    phone: string;
    address: string;
    fed_tax_pay: string;
    legal_entity_banks: Array<Banks>;
    legal_rep: LegalRepresentative
}

export class Banks {
    id: string;
    bank_name: string;
    swift: string;
    account_number: string;
    currency_id: number;
}

export class LegalRepresentative {
    id?: string;
    name: string;
    dial_code: string;
    country_code: string;
    phone: string;
    email: string;
    fed_tax_pay: string;
    legal_rep_banks: Array<Banks>;
}