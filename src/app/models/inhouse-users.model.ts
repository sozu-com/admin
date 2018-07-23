export class InhouseUsers{

    public address = [
        {
            countries: '',
            states : '',
            cities: '',
            localities: ''
        }
    ];

    public userModel = {
        name: '',
        country_code: '52',
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

export class user{
    name: '';
    country_code: '52';
    phone: '';
    image: '';
    email: '';
    is_broker_seller_dev: false;
    is_buyer_renter: false;
    is_broker: false;
    is_data_collector: false;
    is_csr_closer: false;
}

export class address{
    address: [
        {
            countries: '',
            states: '',
            cities: '',
            localities: ''
        }
    ];
}
