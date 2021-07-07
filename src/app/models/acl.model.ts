import { Agency } from "src/app/models/agency.model";

export class ACL {
    id?: string;
    name?: string;
    first_surname?: string;
    second_surname?: string;
    country_code?: string;
    dial_code?: string;
    phone?: string;
    is_broker_seller_dev?: boolean;
    is_buyer_renter?: boolean;
    is_broker?: boolean;
    is_data_collector?: boolean;
    is_csr_closer?: boolean;
    is_csr_renter?: boolean;
    is_collection_agent?: boolean;
    is_credit_agent?: boolean;
    is_alliance_agent?: boolean;
    is_acl?: boolean;
    is_developer?: boolean;
    // keys added for external broker
    is_external_agent?: boolean;
    agency?: Agency;
    is_inhouse_agent?: boolean; // for frontend use only
    // company_name?: string;
    // company_logo?: string;
    description?: string;
    adr?: string;   // address string
    lat?: any;
    lng?: any;
    // branches?: Array<Branches>;
    // branch_office?: string;
    // branch_lat?: any;
    // branch_lng?: any;
    // company_images?: Array<any>;
    // company_videos?: Array<any>;
    rfc_legal_id?: string;
    is_company?: string;

    image?: string;
    img_loader?: boolean;
    email?: string;
    admin_acl?: Array<Permission> = [];
    address?: Array<NewAddress>;
    user_type?: any;
    is_cordinator?:any;
    can_csr_coordinator?:any;
}

export class Permission {
    show: boolean;
    acl: {
        name: string;
    };
    acl_id: number;
    can_create: number;
    can_read: number;
    can_update: number;
    can_delete: number;   // used for block/unblock
    can_purge: number;  // used for delete
    can_crud: number;
}

export class NewAddress {
    countries: string;
    states: string;
    cities: string;
    localities: string;
    buildings: string;
}
