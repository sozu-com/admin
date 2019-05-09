import { Locality } from "./locality.model";
import { City } from "./location.model";

export class CarpetAreas {
    carpet_areas: Array<object> = [
        {
            area: 0,
            price: 0
        }
    ];
}

export class AddProjectModel {
    id = '';
    building_id = '';
    country_id = '';
    state_id = '';
    city_id = '';
    locality_id = '';
    name = '';
    for_rent = false;
    for_sale = true;
    floors: any = '';
    address = '';
    avg_price = '';
    cover_image: File;
    images: any = [];
    images360: any = [];
    videos: any = [];
    building_images: any = [];
    description = '';
    amenities = [];
    lat: any = '';
    lng: any = '';
    custom_attributes = [];
    custom_values = [];
    configurations = [];

    // Preferable buyers
    pets = 1;
    kids_friendly = 1;
    students_friendly = 1;
    lgtb_friendly = 1;
    mature_people_friendly = 1;
    marital_status: any = [1];

    developer = {
        id: '',
        name: '',
        email: '',
        country_code: '',
        dial_code: '',
        phone: '',
        logo: '',
        image: '',
        developer_image: '',
        developer_company: '',
        developer_desc: ''
    };
    developer_id: any;
    dev_countrycode: any = '';
    dev_dialcode: any = '';
    dev_email: any = '';
    dev_phone: any = '';
    dev_name: any = '';
    dev_logo: any = '';

    building_age = '';
    building_type = '';
    building_type_id: any = '';
    possession_status_id: any = '';
    launch_date: any = '';
    main_image: any = '';
    is_completed: any;
    building_request_id: '';
    building_towers: Array<Towers>;
    building_tower_edit_index: any;
    videoLoader: boolean;
    locality: LocalityToCountry;
}


export class Configuration {
    base_price: any = '';
    building_id: any = '';
    carpet_area: any = '';
    config: any = {
        created_at: '',
        created_by: '',
        id: '',
        name: '',
        name_en: '',
        name_es: '',
        status: '',
        updated_at: ''
    };
    configuration_id: any = '';
    created_at: any = '';
    created_by: any = '';
    floor_map_image: any = '';
    id: any = '';
    other_images: any = [];
    images_files: any = [];
    images_path: any = [];
    images: any = [];
    updated_at: any = '';
    name: any = '';
}

export class Towers {
    id?: string;
    building_id: string;
    tower_name: string;
    num_of_floors: number;
    possession_status_id: string;
    launch_date: string;
    amenities: Array<AmenitiesShowObj>;
    amenitiesId: Array<string>;
    floor_array?: Array<number>;
    amenitiesCount?: number;
    // amenities: Array<any>;
    // amenitiesId: Array<any>;
}

export class AmenitiesShowObj {
    id: string;
    name_en: string;
    name_es: string;
    icon: string;
    name: string;
    selected: boolean;
    images: Array<string>;
}

export class LocalityToCountry {
    id: any;
    name_es: string;
    name_en: string;
    status: any;
    city_id: any;
    poly_coordinates: any;
    price_per_sqft: any;
    city: City;
}
