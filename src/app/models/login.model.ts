
export class Login {
    id: number;
    name: string;
    image: string;
    email: string;
    address: string;
    dial_code: string;
    country_code: string;
    phone: string;
    is_blocked: number;
    created_by: string;
    is_bank: number;
    is_noatary: number;
    floating_int: number;
    branch: string;
    is_acl: number;
    token: string;
    admin_acl: Array<ACL>;
    permissions: Permissions;
}

export class AdminACL {
    admin_acl: Object;
}

export class ACL {
    id: number;
    admin_id: number;
    acl_id: number;
    can_create: number;
    can_read: number;
    can_update: number;
    can_delete: number;
    acl: {
        id: number;
        name: string;
    };
}

export class Permissions {
    id: number;
    admin_id: number;
    all_geo_access: number;
    can_data_collector: number;
    can_csr_buyer: number;
    can_csr_seller: number;
    can_csr_closer: number;
    can_in_house_broker: number;
    can_crud_admins: number;
    can_crud_users: number;
    can_crud_buildings: number;
    can_crud_properties: number;
    can_crud_leads: number;
    can_view_reports: number;
    can_crud_banks: number;
    can_crud_notaries: number;
    can_crud_blog: number;
    created_at: string;
    updated_at: string;
}
