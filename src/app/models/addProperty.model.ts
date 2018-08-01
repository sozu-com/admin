export class CarpetAreas {
    carpet_areas: Array<object> = [
        {
            area: 0,
            price: 0
        }
    ];
}

export class AddPropertyModel {
    id = '';
    step = 0;
    for_rent = false;
    for_sale = true;
    country_id = '';
    state_id = '';
    city_id = '';
    locality_id = '';
    configuration_id = '';
    carpet_areas = [
        {
            area: '',
            price: ''
        }
    ];
    property_type_id = '';
    property_id = '';
    cover_image: File;
    images = [];
    floor_plan: File;
    bedroom = '1';
    bathroom = '1';
    floor = '1';
    parking = '0';
    furnished = '0';
    description = '';
    quantity = '1';
    amenities = [];
    banks = [];
    pets = '1';
    marital_status = [
        1
    ];
    custom_attributes = [
        {
            name: '',
            value: ''
        }
    ];
}

export class Building {
    name: string;
    address: string;
    lat: number;
    lng: number;
    dev_name: string;
    dev_phone: string;
    dev_email: string;
    dev_countrycode: string;
}
