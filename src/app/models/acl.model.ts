export class ACL {
    id: string;
    name: string;
    country_code: string;
    dial_code: string;
    phone: string;
    image: string;
    email: string;
    acl_array: Array<Permission>;
    acl: Array<number>;
}

export class Permission {
    id: string;
    name: string;
}
