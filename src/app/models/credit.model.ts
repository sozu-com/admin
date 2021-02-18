import { Users } from "./users.model";

export class Credit {
    admin_id?: number;
    bank?: Bank;
    bank_id?: number;
    caseStatus_id?: number;
    created_at?: string;
    credit_amount?: string;
    customerProfile_id?: number;
    deadlines_quote?: DeadlinesQuote;
    destination?: Destination;
    destination_id?: number;
    executive_id?: number;
    home_value?: string;
    id?: number;
    payment_scheme?: PaymentScheme;
    programs?: Programs;
    programs_id?: number;
    property_status?: number;
    square_id?: number;
    state_id?: number;
    step?: number;
    updated_at?: string;
    user?: Users;
    user_id?: number;
}

export class Bank {
    created_at?: string;
    deleted_at?: number;
    id?: number;
    name_en?: string;
    name_es?: string;
    updated_at?: string;
}

export class DeadlinesQuote {
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

export class Programs {
    created_at?: string;
    deleted_at?: number;
    id?: number;
    name_en?: string;
    name_es?: string;
    updated_at?: string;
}

export class Destination {
    created_at?: string;
    deleted_at?: number;
    id?: number;
    name_en?: string;
    name_es?: string;
    updated_at?: string;
}
