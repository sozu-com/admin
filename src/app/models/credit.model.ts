import { Users } from "./users.model";

export class Credit {
    admin_id?: number;
    bank_id?: Array<Bank>;
    case_status?: number;
    created_at?: string;
    credit_amount?: string;
    customer_profile?: number;
    deadlines_quote?: number;
    destination_id?: number;
    executive?: number;
    home_value?: string;
    id?: number;
    payment_scheme?: Array<PaymentScheme>;
    programs_id?: number;
    property_status?: number;
    square_id?: number;
    state?: number;
    step?: number;
    updated_at?: string;
    user?: Users;
    user_id?: number;
    credit_user_id?: number;
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
