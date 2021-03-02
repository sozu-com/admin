import { Users } from "./users.model";
export class Credit {
    admin_id?: number;
    deadlines_quote?: Array<PaymentScheme>;
    bank_id?: Array<Bank>;
    case_status?: string;
    created_at?: string;
    credit_amount?: string;
    customer_profile?: string;
    destination_id?: string;
    executive?: string;
    home_value?: string;
    subaccount_balance?: string;
    infonavit_credit?: string;
    id?: number;
    payment_scheme?: Array<PaymentScheme>;
    programs_id?: any;
    property_status?: number;
    square?: string;
    state?: string;
    country_id?: string;
    step?: number;
    updated_at?: string;
    user?: Users;
    user_id?: number;
    credit_user_id?: number;
    general_data: GeneralData;
    economic_dependent?: EconomicDependent;
    references?: References;
    solidarity_liabilities?: SolidarityLiabilities
    incomes?: Incomes;
}

export class Bank {
    created_at?: string;
    deleted_at?: number;
    id?: number;
    name_en?: string;
    name_es?: string;
    updated_at?: string;
}

export class PaymentScheme {
    created_at?: string;
    deleted_at?: number;
    id?: number;
    name_en?: string;
    name_es?: string;
    updated_at?: string;
}
export class GeneralData {
    credites_details_id?: number;
    id?: number;
    general_data_id?: number;
    co_credited_email?: string;
    co_credited_relationship?: string;
    co_credited_owner?: string;
    co_credited_involved_credit?: string;
    co_credited_involved_revenue?: string;
    credit_card?: string;
    existing_mortgage?: string;
    loan?: string;
    four_digit?: string;
}

export class EconomicDependent {
    credits_relationship_id?: string;
    age?: string;
    occupation?: string;
}

export class References {
    credits_relationship_id?: string;
    name?: string;
    first_surname?: string;
    second_surname?: string;
    years?: string;
    country_code?: string;
    phone_code?: string;
    phone_number?: string;
    address?: string;
    home_country_code?: string;
    home_dial_code?: string;
    home_phone?: string;
    office_country_code?: string;
    office_dial_code?: string;
    office_phone?: string;
    email?: string;
    participate_credit?: string;
}

export class SolidarityLiabilities {
    name?: string;
    first_surname?: string;
    second_surname?: string;
    gender?: string;
    email?: string;
    country_code?: string;
    phone_code?: string;
    phone_number?: string;
    dob?: string;
    curp?: string;
    federal_tax?: string;
    nationality?: string = '1';
    marital_status?: string;
    scholarship?: string;
    street_address?: string;
    external_number?: string;
    internal_number?: string;
    zip_code?: string;
    municipality?: string;
    country?: string;
    state?: string;
    city?: string;
    neighbourhood?: string;
    neighbourhoods?: any[];
    number_of_dependents?: string;
    own_property?: string;
    total_value_property?: string;
    total_assessed_value?: string;
    own_car?: string;
    //solidarity_id?: number;
    value_of_own_car?: string;
}

export class Incomes {
    id?: string;
    incomes_id?: string;
    monthly_income?: string;
    net_income?: string;
    business?: string;
    job_type: string = null;
    start_date?: string;
    address?: string;
    colony?: string;
    city?: string;
    municipality?: string;
    zip_code?: string;
    //phone?: string;
    country_code?: string;
    phone_code?: string;
    phone_number?: string;
    state?: string;
    country?: string;
    market_stall?: string;
    area?: string;
    contact_type: string = null;
    turn: string = null;
    hold_tax_status?: string;
    laboral_status: string = null;
    profession?: string;
    check_income: string = null;
    immediate_boss?: string;
    description?: string;
    neighbourhoods?: any[];
    last_company?: string;
    last_start_date?: string;
    last_departure_date?: string;
    last_separation?: string;
    //last_phone_code?: string;
    last_country_code?: string;
    last_phone_code?: string;
    last_phone_number?: string;
    boss?: string;
    contract?: string;
    last_laboral_sector?: string;
    last_job_type?: string;
}
