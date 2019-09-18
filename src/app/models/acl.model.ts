export class ACL {
    id?: string;
    name?: string;
    country_code?: string;
    dial_code?: string;
    phone?: string;
    image?: string;
    img_loader?: boolean;
    email?: string;
    admin_acl?: Array<Permission> = [];
    address?: Array<NewAddress>;
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
