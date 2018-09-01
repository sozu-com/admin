export class ACL {
    id: string;
    name: string;
    country_code: string;
    dial_code: string;
    phone: string;
    image: string;
    email: string;
    access_control: Array<Object> = [
        {
            min_price: 0,
            max_price: 0,
            interest : 0
        }
    ];
}
