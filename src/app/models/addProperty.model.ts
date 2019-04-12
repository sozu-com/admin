import { User } from "./inhouse-users.model";

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
    name = '';
    for_rent = false;
    for_sale = true;
    for_hold = false;
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
    half_bathroom = 1;
    floor = 1;
    parking = 1;
    furnished = 1;
    description = '';
    quantity = 1;
    amenities: any = [];
    banks: any = [];
    pets = 1;
    kids_friendly = 1;
    students_friendly = 1;
    lgtb_friendly = 1;
    mature_people_friendly = 1;
    property_price = 1;
    marital_status: any = [1];
    // custom_attributes: any = [
    //     {
    //         name: '',
    //         value: ''
    //     }
    // ];
    custom_attributes: any = [];
    property_quantity_details: any = [];
    building_id: string;
    building_towers_id: string;
    floor_num: string;
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

export class SellerSelections {
    id: string;
    property_id: string;
    status: number;
    user: User;
}
