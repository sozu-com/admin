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
    // for_rent: any = '0';
    // for_sale: any = '1';
    country_id = '';
    state_id = '';
    city_id = '';
    locality_id = '';
    configuration_id = '';
    property_type_id = '';
    // carpet_areas: any = [
    //     {
    //         area: '',
    //         price: ''
    //     }
    // ];
    carpet_areas: any = [];
    property_id = '';
    cover_image: File;
    images: any = [];
    floor_plan: File;
    bedroom = 1;
    bathroom = 1;
    floor = 1;
    parking = 1;
    furnished = 1;
    description = '';
    quantity = 1;
    amenities: any = [];
    banks: any = [];
    pets = 1;
    marital_status: any = [1];
    // custom_attributes: any = [
    //     {
    //         name: '',
    //         value: ''
    //     }
    // ];
    custom_attributes: any = [];
    property_quantity_details: any= [];
}

export class Building {
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
    dev_name: string;
    dev_phone: string;
    dev_email: string;
    dev_countrycode: string;
}

export class PropertyDetails {
    floor: number;
    area: number;
    conf_type: any;
    price: number;
    total_price: number;
    payment_status_id: any;
    building_specific_type_id: any;
    direction: any;
}
