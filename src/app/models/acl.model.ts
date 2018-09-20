export class ACL {
    id: string;
    name: string;
    country_code: string;
    dial_code: string;
    phone: string;
    image: string;
    email: string;
    admin_acl: Array<Permission> = [];
}

export class Permission {
    name: string;
    acl_id: number;
    can_create: number;
    can_read: number;
    can_update: number;
    can_delete: number;
}
