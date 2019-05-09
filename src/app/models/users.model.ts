export class Users {
    id: string;
    company_name?: string;
    name: string;
    country_code: string;
    dial_code: string;
    phone: string;
    image: any;
    developer_image?: any;      // cover image of dev
    email: string;
    interested_in: string;
    user_type: string;
    address: string;
    selected: any;
    is_developer?: string;
    developer_company?: string;
    developer_desc?: string;
    developer_address?: string;
    lat?: any;
    lng?: any;
    branch_office?: string;
    branch_lat?: any;
    branch_lng?: any;
    page?: number;
    buildings_sort?: number;
    images?: Array<any>;
    videos?: Array<string>;
}
