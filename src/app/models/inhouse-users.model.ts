export class InhouseUsers {

    public address = [
        {
            countries: '',
            states : '',
            cities: '',
            localities: '',
            buildings: ''
        }
    ];

    public userModel = {
        id: '',
        name: '',
        country_code: 'mx',
        dial_code: '+52',
        phone: '',
        image: '',
        email: '',
        address: this.address,
        is_broker_seller_dev: false,
        is_buyer_renter: false,
        is_broker: false,
        is_data_collector: false,
        is_csr_closer: false
    };
}

export class UserModel {
    id: string;
    name: string;
    country_code: string;
    dial_code: string;
    phone: string;
    image: string;
    email: string;
    address: Array<NewAddress>;
    is_broker_seller_dev: boolean;
    is_buyer_renter: boolean;
    is_broker: boolean;
    is_data_collector: boolean;
    is_csr_closer: boolean;
}

export class User {
    name: '';
    country_code: 'mx';
    dial_code: '+52';
    phone: '';
    image: '';
    email: '';
    is_broker_seller_dev: false;
    is_buyer_renter: false;
    is_broker: false;
    is_data_collector: false;
    is_csr_closer: false;
}

export class Address {
    address: [
        {
            countries: '',
            states: '',
            cities: '',
            localities: '',
            buildings: ''
        }
    ];
}

export class NewAddress {
    countries: string;
    states: string;
    cities: string;
    localities: string;
    buildings: string;
}
