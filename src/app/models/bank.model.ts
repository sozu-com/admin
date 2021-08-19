export class Bank {
    id: string;
    bank_name: string;
    name: string;
    country_code: string;
    dial_code: string;
    phone: string;
    image: string;
    img_loader: boolean;
    email: string;
    branch: string;
    floating_int: string;
    interests: string;
    interestsArray: Array<Object> = [
        {
            min_price: 0,
            max_price: 0,
            interest : 0
        }
    ];
}
