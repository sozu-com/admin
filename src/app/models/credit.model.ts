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
    square_id?: string;
    state?: string;
    step?: number;
    updated_at?: string;
    user?: Users;
    user_id?: number;
    credit_user_id?: number;
   
    general_data?:GeneralData;
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
    general_data_id?: any;
    name?: string;
    first_surname?: string;
    second_surname?: string;
    gender?: string;
    email?: string;
    contact_number?: string;
    dob?: string;
    curp?: string;
    rfc?: string;
    nationaliy?: string;
    civil_status?: string;
    street?: string;
    outdoor_number?: string;
    interior_number?: string;
    colony?: string;
    municipality?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    co_credited_email?: string;
    co_credited_relationship?: string;
    co_credited_owner?: string;
    co_credited_involved_credit?: string;
    co_credited_involved_revenue?: string;
    credit_card?: string;
    existing_mortgage?: string;
    loan?: string;
}