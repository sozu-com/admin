export class InhouseUsers{
    public userModel = {
        name: '',
        country_code: '52',
        phone: '',
        image: '',
        email: '',
        address: [
            {
                countries: '',
                states: '',
                cities: '',
                localities: ''
            }
        ],
        is_broker_seller_dev: false,
        is_buyer_renter: false,
        is_broker: false,
        is_data_collector: false,
        is_csr_closer: false
    }


    public address = [
        {
            countries: '',
            states : '',
            cities: '',
            localities: ''
        }
    ]
}