

import { Users } from "./users.model";
export class Beneficiary {
    id: number;
    beneficiary_name: string;
    beneficiary_firstSurname: string;
    beneficiary_secondSurname: string;
    beneficiary_relationship: string;
    beneficiary_dob: any;
    beneficiary_percentage: string;
    beneficiary_address: string;
    beneficiary_phone: string;
    beneficiary_email: string;

    curp: string;
    fedtax_pay: string;
    nationality: number = 1;
    marital_status: number = 0;
    gender: string;
    nationality_name: string;

    user?: Users;
    user_id?: number;
    user_type?: any;
    tutor?: Tutor;
}
export class Tutor {
    beneficiary_id?: number;
    tutor_name: string;
    tutor_firstSurname: string;
    tutor_secondSurname: string;
    tutor_relationship: string;
    tutor_dob: string;
    tutor_address: string;
    tutor_phone: string;
    tutor_email: string;
}