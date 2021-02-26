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
    dial_code?: string;
    phone_number?: string;
    address?: string;
    home_country_code?: string;
    home_dial_code?: string;
    home_phone_number?: string;
    office_country_code?: string;
    office_dial_code?: string;
    office_phone_number?: string;
    email?: string;
    participate_credit?: string;
}