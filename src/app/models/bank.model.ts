export class Bank {
    id: string;
    name: string;
    country_code: string;
    dial_code: string;
    phone: string;
    image: string;
    email: string;
    branch: string;
    floating_int: string;
    interests: Array<Object> = [
        {
            min_price: 0,
            max_price: 0,
            interest : 0
        }
    ];
}
