export class ACL {
    id: string;
    name: string;
    country_code: string;
    dial_code: string;
    phone: string;
    image: string;
    email: string;
    acl_array: Array<Permission> = [];
    acl: Array<Permission> = [];
}

export class Permission {
    id: number;
    name: string;
    acl_id: number;
    can_create: number;
    can_read: number;
    can_update: number;
    can_delete: number;
}
